import { Types } from 'mongoose';

import db from '@config/db';
import { cloudinary } from '@config/cloudinary';

import { User } from '@api/users/model';
import { Server } from '@api/servers/model';
import { ServerMember } from '@api/serverMembers/model';
import { DM } from '@api/dms/model';
import { Message } from '@api/messages/model';

import { authService } from '@api/auth/service';

import { defaultRoleFields } from '@api/servers/roles/schema';

const CLOUDINARY_BASE_FOLDER = '/discord_clone';

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
  // fields: email, username, password, displayName, avatarUrl
  console.log('Creating users...');
  const users = await Promise.all([
    {},
    {},
    {},
    {},
    {},
  ].map(async ({
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

    const cloudinaryRes = await cloudinary.uploader.upload('', {
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
  const servers = await Promise.all([
    {},
    {},
    {},
    {},
    {},
  ].map(async ({
    ownerId,
    serverName,
    avatarUrl,
    bannerUrl,
    categoryNames,
    channelFields,
    rolesFields, // name, color, permissions
    customEmojiFields,
  }) => {
    const serverId = new Types.ObjectId();

    const server = new Server({
      _id: serverId,
      ownerId,
      name: serverName,
      description: '',
      private: false,
    });

    const serverOwner = new ServerMember

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
    serverOwner.roleIds.push(server.roles[0]._id);

    rolesFields.forEach(field => { server.roles.push(field); });

    customEmojiFields

    await server.save();

    return server;
  }));

  

  /// Roles - 2 - 5

  /// Custom emojis - 3 - 10

  // DMs and groups - 4 DM, 2 groups

  /// Messages
}

populateDb();