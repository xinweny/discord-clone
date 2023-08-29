import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys';
import { CustomError } from '@helpers/CustomError';

import { User } from '@api/users/model';
import { Message } from '@api/messages/model';
import { ServerMember } from '../serverMembers/model';
import { Server } from './model';

import { serverInviteService } from '@api/serverInvites/service';
import { cloudinaryService } from '@services/cloudinary';

const getPublic = async (
  query?: string,
  pagination?: { page: number, limit: number },
) => {
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 10; 

  const queryObj = {
    private: false,
    ...(query && { $text: { $search: query } }),
  };

  const [servers, count] = await Promise.all([
    Server
      .find(
        queryObj,
        query ? { score: { $meta: 'textScore' } } : undefined
      )
      .select('name createdAt memberCount description imageUrl')
      .sort(query ? { score: { $meta: 'textScore' } } : { memberCount: 1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Server.countDocuments(queryObj)
  ]);

  return { servers, count };
}

const getById = async (id: Types.ObjectId | string) => {
  const server = await Server.findById(id);

  return server;
};

const create = async (
  fields: {
    name: string,
    private: boolean,
  },
  userId: Types.ObjectId | string,
  avatarFileName?: string,
) => {
  const user = await User.findById(userId);

  if (!user) return null;

  const serverId = new Types.ObjectId();

  const creator = new ServerMember({
    userId,
    serverId,
    displayName: user.displayName,
  });

  const query = keepKeys(fields, ['name', 'private']);
  
  const server = new Server({
    _id: serverId,
    ownerId: creator._id,
    ...query,
  });

  if (avatarFileName) server.avatarUrl = cloudinaryService.generateUrl(avatarFileName, 'avatars/servers', serverId.toString());

  // Default channels
  server.categories.push({
    $each: [{ name: 'Text Channels' }, { name: 'Voice Channels' }],
  });

  server.channels.push({
    $each: [
      { name: 'general', type: 'text', categoryId: server.categories[0].id },
      { name: 'General', type: 'voice', categoryId: server.categories[1].id },
    ],
  });

  for (const i of [0, 1]) {
    server.categories[i].channelIds.push(server.channels[i]._id);
  }

  // Default roles
  server.roles.push({
    name: '@everyone',
    color: '#99AAB5',
    permissions: {
      administrator: false,
      viewChannels: true,
      manageChannels: false,
      manageRoles: false,
      manageExpressions: false,
      kickMembers: false,
      manageServer: false,
      createInvite: true,
      sendMessages: true,
      manageMessages: false,
      addReactions: true,
      joinCall: true,
      speak: true,
      video: true,
    },
  });
  creator.roleIds.push(server.roles[0]._id);

  await server.save();
  await Promise.all([
    creator.save(),
    serverInviteService.create(serverId),
    User.findByIdAndUpdate(userId, { $push: { serverIds: serverId } }),
  ]);

  return server;
};

const update = async (id: Types.ObjectId | string, fields: {
  name?: string,
  private?: boolean,
  description?: string,
}, imgFileNames: { avatar?: string, banner?: string }) => {
  const { avatar, banner } = imgFileNames;

  const query = keepKeys(fields, ['name', 'private', 'description']);

  const server = await Server.findByIdAndUpdate(id, {
    $set: {
      ...query,
      ...(avatar && {
        avatarUrl: cloudinaryService.generateUrl(avatar, 'avatars/servers', id.toString()),
      }),
      ...(banner && {
        bannerUrl: cloudinaryService.generateUrl(banner, 'banners/servers', id.toString()),
      }),
    },
  }, { new: true, runValidators: true });

  return server;
};

const checkPermissions = async (
  serverId: Types.ObjectId | string,
  userId: Types.ObjectId | string,
  permissionKeys: string | string[] = [],
  memberId?: Types.ObjectId | string,
) => {
  const [server, member] = await Promise.all([
    Server.findById(serverId),
    ServerMember.findOne({ serverId, userId }),
  ]);

  if (!server || !member) return false;

  if (memberId && member._id.equals(memberId)) return { server, member };

  const permissions = (typeof permissionKeys === 'string') ? [permissionKeys] : permissionKeys;

  if (server.checkPermissions(member, permissions)) return { server, member };

  return false;
};

const remove = async (id: Types.ObjectId | string) => {
  const [server, members] = await Promise.all([
    Server.findById(id),
    ServerMember.find({ serverId: id }, 'userId -_id'),
  ]);

  if (!server) throw new CustomError(400, 'Server not found.');

  const channelIds = server?.channels.map(channel => channel._id);

  await Promise.all([
    Server.findByIdAndDelete(id),
    ServerMember.deleteMany({ serverId: id }),
    User.updateMany(
      { _id: { $in: members.map(member => member.userId) } },
      { $pull: { serverIds: id } }
    ),
    Message.deleteMany({ roomId: { $in: channelIds } }),
    serverInviteService.remove(server._id),
    cloudinaryService.deleteByFolder(`attachments/${id.toString()}`),
    (server.avatarUrl) ? cloudinaryService.deleteByUrl(server.avatarUrl) : Promise.resolve(),
    (server.bannerUrl) ? cloudinaryService.deleteByUrl(server.bannerUrl) : Promise.resolve(),
  ]);

  return server;
};

export const serverService = {
  getPublic,
  getById,
  create,
  update,
  remove,
  checkPermissions,
};