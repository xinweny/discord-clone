import { Types } from 'mongoose';

import db from '@config/db';
import { cloudinary } from '@config/cloudinary';

import { User } from '@api/users/model';
import { Server } from '@api/servers/model';
import { ServerMember } from '@api/serverMembers/model';
import { DM } from '@api/dms/model';
import { MessageChannel, MessageDirect } from '@api/messages/discriminators';
import { Reaction } from '@api/reactions/model';

import { authService } from '@api/auth/service';

import { defaultRoleFields } from '@api/servers/roles/schema';

const CLOUDINARY_BASE_FOLDER = '/discord_clone';

const USERS_DATA = [];
const SERVERS_DATA = [];
const DMS_DATA = [];
const MESSAGES_DATA = [];
const REACTIONS_DATA = [];

async function populateDb() {
  console.log('Dropping database and CDN...');

  await Promise.all([
    db.dropDatabase(),
    async () => {
      await cloudinary.api.delete_resources_by_prefix(CLOUDINARY_BASE_FOLDER);
      await cloudinary.api.delete_folder(CLOUDINARY_BASE_FOLDER);
    },
  ]);
  
  // POPULATE DB AND CDN
  // Users - 5
  console.log('Creating users...');

  const users = await Promise.all(USERS_DATA.map(async ({
    email,
    password,
    username,
    displayName,
    avatarUrl,
  }) => {
    const hashedPassword = await authService.hashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
      username,
      displayName,
    });

    const cloudinaryRes = await cloudinary.uploader.upload(avatarUrl, {
      public_id: user.id,
      use_filename: false,
      folder: `${CLOUDINARY_BASE_FOLDER}/users/${user.id}/avatar`,
    });

    if (cloudinaryRes) user.avatarUrl = cloudinaryRes.secure_url;

    await user.save();

    return user;
  }));

  // Servers - 5
  console.log('Creating servers...');

  const servers = await Promise.all(SERVERS_DATA.map(async ({
    ownerIdx,
    serverName,
    avatarUrl,
    bannerUrl,
    categoryNames,
    channelFields,
    roleFields, // name, color, permissions
    customEmojiFields,
    membersData,
  }) => {
    const serverId = new Types.ObjectId();

    const serverOwner = new ServerMember({
      serverId,
      userId: users[ownerIdx]._id,
    });

    const server = new Server({
      _id: serverId,
      ownerId: serverOwner._id,
      name: serverName,
      description: '',
      private: false,
    });

    // Categories - 2 to 3
    categoryNames.forEach(name => { server.categories.push({ name }); });

    // Channels - 2 - 10 text, 1 - 3 voice
    channelFields.forEach(({ name, catIdx, type }) => {
      server.channels.push({
        ...(catIdx && { categoryId: server.categories[catIdx]._id}),
        name,
        type,
      });
    });

    // Upload avatar and server banner
    const [avatarRes, bannerRes] = await Promise.all([
      cloudinary.uploader.upload(avatarUrl, {
        public_id: server.id,
        use_filename: false,
        folder: `${CLOUDINARY_BASE_FOLDER}/servers/${server.id}/avatar`,
      }),
      (bannerUrl
        ? cloudinary.uploader.upload(bannerUrl, {
          public_id: server.id,
          use_filename: false,
          folder: `${CLOUDINARY_BASE_FOLDER}/servers/${server.id}/banner`,
        })
        : Promise.resolve()
      ),
    ]);

    if (avatarRes) server.avatarUrl = avatarRes.secure_url;
    if (bannerRes) server.bannerUrl = bannerRes.secure_url;

    // Create default @everyone role
    server.roles.push(defaultRoleFields);
    
    const defaultRoleId = server.roles[0]._id;

    serverOwner.roleIds.push(defaultRoleId);

    // Roles - 2 to 5
    roleFields.forEach(({ name, color, permissions }) => {
      server.roles.push({
        name,
        color,
        permissions,
      });
    });

    // Custom emojis - 3 to 10
    await Promise.all(customEmojiFields.map(async ({ name, creatorId, url }) => {
      const emojiId = new Types.ObjectId();

      const res = await cloudinary.uploader.upload(url, {
        public_id: emojiId.toString(),
        use_filename: false,
        folder: `${CLOUDINARY_BASE_FOLDER}/servers/${serverId}/emojis`,
      });

      server.customEmojis.push({
        name,
        creatorId,
        url: res.secure_url,
      });
    }));

    // Server members
    await Promise.all(membersData.map(({ userIdx, roleIdxs }) => {
      const member = new ServerMember({
        serverId,
        userId: users[userIdx].id,
        roleIds: [
          defaultRoleId,
          ...(roleIdxs
            ? roleIdxs.map(roleIdx => server.roles[roleIdx].id)
            : []
          ),
        ],
      });

      server.memberCount = server.memberCount + 1;

      return member.save();
    }));

    await server.save();

    return server;
  }));

  // DMs and groups - 4 DM, 2 groups
  console.log('Creating DMs...');
  const dms = await Promise.all(DMS_DATA.map(async ({
    userIdxs,
    name,
    avatarUrl,
  }) => {
    const dm = new DM({
      participantIds: userIdxs.map(index => users[index].id),
      isGroup: userIdxs.length > 2,
      ...(name && { name }),
    });

    if (avatarUrl) {
      const cloudinaryRes = await cloudinary.uploader.upload(avatarUrl, {
        public_id: dm.id,
        use_filename: false,
        folder: `${CLOUDINARY_BASE_FOLDER}/dms/${dm.id}/avatar`,
      });

      if (cloudinaryRes) dm.imageUrl = cloudinaryRes.secure_url;
    }

    return dm;
  }));

  /// Messages
  console.log('Sending messages...');

  const messages = await Promise.all(MESSAGES_DATA.map(async ({
    senderIdx,
    roomIdx,
    serverIdx,
    body,
    emojisData,
    attachmentsData,
  }) => {
    ['senderId', 'roomId', 'body', 'emojis']

    const fields = {
      senderId: users[senderIdx].id,
      body,
    };

    const message = serverIdx
      ? new MessageChannel({
        ...fields,
        roomId: servers[serverIdx].channels[roomIdx],
        serverId: servers[serverIdx].id,
      })
      : new MessageDirect({
        ...fields,
        roomId: dms[roomIdx].id,
      });

    emojisData.forEach(({
      id,
      shortcode,
      emojiIdx,
    }) => {
      message.emojis.push({
        id,
        shortcode,
        ...(emojiIdx && { url: servers[emojiIdx[0]].customEmojis[emojiIdx[1]].url }),
        custom: !!emojiIdx,
      });
    });

    if (attachmentsData) await Promise.all(attachmentsData.map(async ({ url, filename }) => {
      const cloudinaryRes = await cloudinary.uploader.upload(url, {
        public_id: filename,
        use_filename: true,
        folder: `${CLOUDINARY_BASE_FOLDER}/${serverIdx
          ? `servers/${servers[serverIdx].id}/channels/${servers[serverIdx].channels[roomIdx].id}`
          : `dms/${dms[roomIdx].id}`
        }/messages/${message.id}/attachments`,
      });

      if (cloudinaryRes) message.attachments.push({
        url: cloudinaryRes.secure_url,
        filename,
        mimetype: cloudinaryRes.format,
        bytes: cloudinaryRes.bytes,
      });
    }));

    await message.save();

    return message;
  }));


  // TODO: Finish reaction mock data
  await Promise.all(REACTIONS_DATA.map(async ({

  }) => {
    const reaction = new Reaction();

    return reaction;
  }));
}

populateDb();