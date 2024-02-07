import { Types } from 'mongoose';

import db from '@config/db';
import { cloudinary } from '@config/cloudinary';

import { User } from '@api/users/model';
import { Server } from '@api/servers/model';
import { ServerMember } from '@api/serverMembers/model';
import { DM } from '@api/dms/model';
import { MessageChannel, MessageDirect } from '@api/messages/discriminators';
import { CustomEmojiReaction, EmojiReaction } from '@api/reactions/discriminators';

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
    userId,
    email,
    password,
    username,
    displayName,
    avatarUrl,
  }) => {
    const hashedPassword = await authService.hashPassword(password);

    const user = new User({
      _id: userId,
      email,
      password: hashedPassword,
      username,
      displayName,
    });

    const cloudinaryRes = await cloudinary.uploader.upload(avatarUrl, {
      public_id: userId,
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
    serverId,
    ownerId,
    serverName,
    avatarUrl,
    bannerUrl,
    categoryFields,
    channelFields,
    roleFields, // name, color, permissions
    customEmojiFields,
    membersData,
  }) => {
    const serverOwner = new ServerMember({
      serverId,
      userId: ownerId,
    });

    const server = new Server({
      _id: serverId,
      ownerId: serverOwner._id,
      name: serverName,
      description: '',
      private: false,
    });

    // Categories - 2 to 3
    categoryFields.forEach(({
      categoryId,
      name,
    }) => {
      server.categories.push({
        _id: categoryId,
        name,
      });
    });

    // Channels - 2 - 10 text, 1 - 3 voice
    channelFields.forEach(({ channelId, name, categoryId, type }) => {
      server.channels.push({
        _id: channelId, 
        ...(categoryId && { categoryId: categoryId }),
        name,
        type,
      });
    });

    // Upload avatar and server banner
    const [avatarRes, bannerRes] = await Promise.all([
      cloudinary.uploader.upload(avatarUrl, {
        public_id: serverId,
        use_filename: false,
        folder: `${CLOUDINARY_BASE_FOLDER}/servers/${server.id}/avatar`,
      }),
      (bannerUrl
        ? cloudinary.uploader.upload(bannerUrl, {
          public_id: serverId,
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
    roleFields.forEach(({ roleId, name, color, permissions }) => {
      server.roles.push({
        _id: roleId,
        name,
        color,
        permissions,
      });
    });

    // Custom emojis - 3 to 10
    await Promise.all(customEmojiFields.map(async ({ emojiId, name, creatorId, url }) => {
      const res = await cloudinary.uploader.upload(url, {
        public_id: emojiId,
        use_filename: false,
        folder: `${CLOUDINARY_BASE_FOLDER}/servers/${serverId}/emojis`,
      });

      server.customEmojis.push({
        _id: emojiId,
        name,
        creatorId,
        url: res.secure_url,
      });
    }));

    // Server members
    await Promise.all(membersData.map(({ userId, roleIds }) => {
      const member = new ServerMember({
        serverId,
        userId: userId,
        roleIds: [
          defaultRoleId,
          ...(roleIds || []),
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
    dmId,
    userIds,
    name,
    avatarUrl,
  }) => {
    const dm = new DM({
      _id: dmId,
      participantIds: userIds,
      isGroup: userIds.length > 2,
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
    messageId,
    senderId,
    roomId,
    serverId,
    body,
    emojisData,
    attachmentsData,
  }) => {
    const fields = {
      _id: messageId,
      senderId,
      body,
    };

    const message = serverId
      ? new MessageChannel({
        ...fields,
        roomId,
        serverId,
      })
      : new MessageDirect({
        ...fields,
        roomId,
      });

    emojisData.forEach(({
      emojiId,
      id,
      shortcode,
    }) => {
      message.emojis.push({
        id,
        shortcode,
        ...(emojiId && { url: servers[emojiIdx[0]].customEmojis[emojiIdx[1]].url }),
        custom: !!emojiId,
      });
    });

    if (attachmentsData) await Promise.all(attachmentsData.map(async ({ url, filename }) => {
      const cloudinaryRes = await cloudinary.uploader.upload(url, {
        public_id: filename,
        use_filename: true,
        folder: `${CLOUDINARY_BASE_FOLDER}/${serverId
          ? `servers/${serverId}/channels/${roomId}`
          : `dms/${roomId}`
        }/messages/${messageId}/attachments`,
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
    userIds,
    messageId,
    name,
    emojiId,
    url,
    unified,
    native,
  }) => {
    const fields = {
      messageId,
      name,
      userIds,
      count: userIds.length,
    };

    const reaction = (emojiId && url)
      ? new CustomEmojiReaction({
        ...fields,
        emojiId,
        url,
      })
      : new EmojiReaction({
        ...fields,
        unified,
        native,
      });

    await reaction.save();

    return reaction;
  }));
}

populateDb();