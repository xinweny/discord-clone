import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys';
import { CustomError } from '@helpers/CustomError';

import { User } from '@api/users/model';
import { Message } from '@api/messages/model';
import { ReadStatus } from '@api/users/notifications/model';
import { ServerMember } from '../serverMembers/model';
import { ServerInvite } from '@api/serverInvites/model';
import { CustomEmoji } from '@api/customEmojis/model';
import { Server } from './model';

import { serverInviteService } from '@api/serverInvites/service';
import { cloudinaryService } from '@services/cloudinary';

const getPublic = async (
  query?: string,
  pagination?: { page: number, limit: number },
) => {
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 20; 

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
      .select('name createdAt memberCount description avatarUrl bannerUrl')
      .sort(query ? { score: { $meta: 'textScore' } } : { memberCount: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Server.countDocuments(queryObj),
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

  if (avatarFileName) server.avatarUrl = cloudinaryService.generateUrl(avatarFileName, `servers/${server.id}/avatar`, serverId.toString());

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
        avatarUrl: cloudinaryService.generateUrl(avatar, `servers/${id}/avatar`, id.toString()),
      }),
      ...(banner && {
        bannerUrl: cloudinaryService.generateUrl(banner, `servers/${id}/banner`, id.toString()),
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
  const [server, memberSelf] = await Promise.all([
    Server.findById(serverId),
    ServerMember.findOne({ serverId, userId }),
  ]);

  if (!server || !memberSelf) return false;

  if (memberId && memberSelf.userId.equals(memberId)) return { server, member : memberSelf };

  const permissions = (typeof permissionKeys === 'string') ? [permissionKeys] : permissionKeys;

  if (server.checkPermissions(memberSelf, permissions)) return { server, member: memberSelf };

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
    ServerInvite.deleteOne({ serverId: id }),
    cloudinaryService.deleteByFolder(`servers/${id.toString()}`),
    ReadStatus.deleteMany({ serverId: id }),
    CustomEmoji.deleteMany({ serverId: id })
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