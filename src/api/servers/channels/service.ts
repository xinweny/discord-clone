import { Types } from 'mongoose';

import { formatSetQuery } from '@helpers/formatSetQuery';
import { CustomError } from '@helpers/CustomError';

import { Message } from '@api/messages/model';
import { Server, IServer } from '@api/servers/model';
import { ReadStatus } from '@api/users/readStatus/model';
import type { IServerMember } from '@api/serverMembers/model';
import type { IChannelPermissions } from './schema';

import { cloudinaryService } from '@services/cloudinary';

const get = async (serverId: Types.ObjectId | string, channelId?: Types.ObjectId | string) => {
  const server = await Server.findById(
    serverId,
    channelId ? { roles: { $elemMatch: { _id: channelId } } } : 'channels'
  );

  if (!server) throw new CustomError(400, 'Server not found.');

  return (channelId) ? server.channels[0] : server.channels;
};

const create = async (serverId: Types.ObjectId | string, fields: {
  name: string,
  categoryId?: Types.ObjectId | string,
  type?: string,
  permissions?: {
    private: boolean,
    view: Types.ObjectId[] | string[],
    message: Types.ObjectId[] | string[],
  },
}) => {
  const server = await Server.findById(serverId, 'categories channels');

  if (!server) throw new CustomError(400, 'Server not found.');

  const { categoryId } = fields;

  if (categoryId && !server.categories.id(categoryId)) throw new CustomError(400, 'Category does not exist.');

  server.channels.push(fields);

  const channel = server.channels.slice(-1)[0];
  if (categoryId) server.categories.id(categoryId)?.channelIds.push(channel._id);

  await server.save();

  return channel;
};

const update = async (
  serverId: Types.ObjectId | string,
  channelId: Types.ObjectId | string,
  fields: {
    name?: string,
    description?: string,
}) => {
  const server = await Server.findOneAndUpdate({
    _id: serverId,
    'channels._id': channelId,
  }, {
    $set: formatSetQuery(fields, 'channels'),
  }, { new: true, runValidators: true });

  const channel = server?.channels.id(channelId);

  return channel;
};

const remove = async (serverId: Types.ObjectId | string, channelId: Types.ObjectId | string) => {
  const server = await Server.findById(serverId).select('channels categories');

  if (!server) return null;

  const channel = server.channels.id(channelId);

  server.channels.pull(channelId);

  const category = server.categories.id(channel?.categoryId);

  if (category) category.channelIds = category.channelIds.filter(id => id !== channelId);

  await Promise.all([
    server.save(),
    Message.deleteMany({ roomId: channelId }),
    cloudinaryService.deleteByFolder(`attachments/${serverId}/${channel?._id.toString()}`),
    ReadStatus.deleteMany({ roomId: channelId }),
  ]);

  return channel;
};

const checkPermissions = (channelId: string, server: IServer, member: IServerMember, permissionKey: keyof IChannelPermissions) => {
  const channel = server.channels.id(channelId);

  if (!channel) return false;

  if (permissionKey === 'message' && channel.type === 'voice') throw new CustomError(400, 'Cannot message in voice channels.');

  if (!channel.permissions.private) return true;

  if (permissionKey !== 'private') {
    const messagePermission = channel.permissions[permissionKey];

    if (messagePermission.some((id: Types.ObjectId) => member.roleIds.map(i => i.toString()).includes(id.toString()))) return true; 
  }
  
  return false;
};

export const channelService = {
  get,
  create,
  update,
  remove,
  checkPermissions,
};