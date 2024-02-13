import { Types } from 'mongoose';

import * as data from './data.json';

import db from '@config/db';
import { cloudinary } from '@config/cloudinary';

import { IMessageEmoji } from '@api/messages/model';

import { User } from '@api/users/model';
import { Server } from '@api/servers/model';
import { ServerMember } from '@api/serverMembers/model';
import { DM } from '@api/dms/model';
import { MessageChannel, MessageDirect } from '@api/messages/discriminators';
import { CustomEmojiReaction, EmojiReaction } from '@api/reactions/discriminators';
import { CustomEmoji } from '@api/customEmojis/model';
import { ServerInvite } from '@api/serverInvites/model';

import { authService } from '@api/auth/service';

import { IPermissions, defaultRoleFields } from '@api/servers/roles/schema';

async function populateDb() {
  const CLOUDINARY_BASE_FOLDER = '/discord_clone';

  const USERS_DATA: {
    userId: string,
    email: string,
    password: string,
    username: string,
    displayName: string,
    avatarUrl: string,
    bannerColor: string,
    customStatus?: string,
    bio?: string,
  }[] = data.users || [];
  const SERVERS_DATA = data.servers || [] as {
    serverId: string;
    ownerId: string;
    serverName: string;
    avatarUrl: string;
    bannerUrl: string;
    categoryFields: {
      categoryId: string;
      name: string;
    }[];
    channelFields: {
      channelId: string;
      name: string;
      type: 'text' | 'voice';
      description?: string;
      categoryId?: string;
    }[];
    roleFields: {
      roleId: string;
      name: string;
      color: string;
      permissions: IPermissions;
    }[];
    customEmojiFields: {
      emojiId: string;
      name: string;
      url: string;
    }[];
    membersData: {
      userId: string;
      roleIds: string[];
    }[];
    inviteId: string;
  }[];
  const DMS_DATA: {
    dmId: string;
    userIds: string[];
    name?: string;
    avatarUrl?: string;
  }[] = data.dms || [];
  const MESSAGES_DATA: {
    messageId: string;
    senderId: string;
    roomId: string;
    serverId: string | undefined;
    body: string;
    emojisData: {
      emojiId: string,
      shortcode: string,
      custom: boolean,
    }[] | undefined,
    attachmentsData: {
      url: string;
      filename: string;
    }[] | undefined;
  }[] = data.messages || [];
  const REACTIONS_DATA: {
    userIds: string[];
    messageId: string;
    name: string;
    emojiId?: string;
    unified?: string;
    native?: string;
  }[] = data.reactions || [];

  console.log('Dropping database and CDN...');

  await Promise.all([
    db.dropDatabase(),
    async () => {
      await cloudinary.api.delete_resources_by_prefix(CLOUDINARY_BASE_FOLDER);
      await cloudinary.api.delete_folder(CLOUDINARY_BASE_FOLDER);
    },
  ]);
  
  // POPULATE DB AND CDN
  // Users - 10
  console.log('Creating users...');

  const users = await Promise.all(USERS_DATA.map(async ({
    userId,
    email,
    password,
    username,
    displayName,
    avatarUrl,
    bannerColor,
    customStatus,
    bio,
  }) => {
    const hashedPassword = await authService.hashPassword(password);

    const user = new User({
      _id: userId,
      email,
      password: hashedPassword,
      username,
      displayName,
      bannerColor,
      customStatus,
      bio,
    });

    const cloudinaryRes = await cloudinary.uploader.upload(avatarUrl, {
      public_id: userId.toString(),
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
    roleFields,
    customEmojiFields,
    membersData,
    inviteId,
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

    // Categories - 2 to 3
    categoryFields!.forEach(({
      categoryId,
      name,
    }) => {
      server.categories.push({
        _id: categoryId,
        name,
      });
    });

    // Channels - 2 - 10 text, 1 - 3 voice
    channelFields!.forEach(({ channelId, name, categoryId, type }) => {
      server.channels.push({
        _id: channelId, 
        ...(categoryId && { categoryId: categoryId }),
        name,
        type,
      });
    });

    // Create default @everyone role
    server.roles.push(defaultRoleFields);
    
    const defaultRoleId = server.roles[0]._id;

    serverOwner.roleIds.push(defaultRoleId);

    // Roles - 2 to 5
    roleFields!.forEach(({ roleId, name, color, permissions }) => {
      server.roles.push({
        _id: roleId,
        name,
        color,
        permissions,
      });
    });

    // Custom emojis - 3 to 10
    await Promise.all(customEmojiFields!.map(async ({ emojiId, name, url }) => {
      const res = await cloudinary.uploader.upload(url, {
        public_id: emojiId,
        use_filename: false,
        folder: `${CLOUDINARY_BASE_FOLDER}/servers/${serverId}/emojis`,
      });

      const emoji = new CustomEmoji({
        _id: emojiId,
        creatorId: ownerId,
        name,
        url: res.secure_url,
      });

      await emoji.save();

      return emoji;
    }));

    // Server members
    await Promise.all(membersData!.map(({ userId, roleIds }) => {
      const user = users.find(u => u._id.equals(userId));

      if (!user) return Promise.resolve();

      if (user._id.equals(serverOwner._id)) {
        roleIds.forEach(rId => {
          serverOwner.roleIds.push(new Types.ObjectId(rId));
        });

        return serverOwner.save();
      }

      const member = new ServerMember({
        serverId,
        userId: userId,
        roleIds: [
          defaultRoleId,
          ...(roleIds || []),
        ],
        bannerColor: user?.bannerColor,
        bio: user?.bio,
      });

      server.memberCount = server.memberCount + 1;

      return member.save();
    }));

    const serverInvite = new ServerInvite({
      serverId,
      url: `https://discord-clone.gg/${inviteId}`
    });

    await Promise.all([
      serverInvite.save(),
      server.save(),
    ]);

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

    if (emojisData) emojisData.forEach(({
      emojiId,
      shortcode,
      custom,
    }) => {
      message.emojis.push({
        id: emojiId,
        shortcode,
        ...(emojiId && {
          url: servers.find(s => s._id.equals(serverId))?.customEmojis.find(e => e._id.equals(emojiId))?.url,
        }),
        custom,
      } as IMessageEmoji);
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

  await Promise.all(REACTIONS_DATA.map(async ({
    userIds,
    messageId,
    name,
    emojiId,
    unified,
    native,
  }) => {
    const fields = {
      messageId,
      name,
      userIds,
      count: userIds.length,
    };

    const reaction = emojiId
      ? new CustomEmojiReaction({
        ...fields,
        emojiId,
        url: servers.flatMap(s => s.customEmojis)?.find(e => e._id.equals(emojiId))?.url,
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