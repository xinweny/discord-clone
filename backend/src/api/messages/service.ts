import { Types, } from 'mongoose';

import { CustomError } from '@helpers/CustomError';
import { keepKeys } from '@helpers/keepKeys';

import { IMessageEmoji, Message } from './model';
import { MessageChannel, MessageDirect } from './discriminators';

import { Reaction } from '../reactions/model';
import { DM } from '@api/dms/model';
import { ServerMember } from '@api/serverMembers/model';

import { cloudinaryService } from '@services/cloudinary';

const getOne = async (id: string) => {
  const message = await Message.findById(id);

  return message;
};

const getMany = async (
  fields: {
    senderId?: Types.ObjectId | string,
    roomId?: Types.ObjectId | string,
  },
  pagination: {
    next?: string,
    limit: number,
  },
  isFromServer: boolean,
  query?: string
) => {
  const { next, limit } = pagination;

  const queryObj = {
    ...fields,
    ...(query && { body: { $regex: query, $options: 'i' } }),
    ...(next && { _id: { $lt: new Types.ObjectId(next) } }),
  };

  const populateOptions = [
    { path: 'sender', select: 'displayName username avatarUrl' }
  ];

  if (isFromServer) populateOptions.push({
    path: 'serverMember',
    select: 'displayName -userId',
  });

  const messages = await Message.find(queryObj)
    .sort({ _id: -1 })
    .limit(limit)
    .populate(populateOptions);

  messages.reverse();

  const lastMessage = messages[0];

  return {
    messages,
    next: lastMessage ? lastMessage._id : null,
  };
};

const create = async (
  fields: {
    senderId: Types.ObjectId | string,
    roomId: Types.ObjectId | string,
    body: string,
    emojis: IMessageEmoji[] | undefined,
  },
  attachments?: {
    filename: string;
    bytes: number;
    mimetype: string;
  }[],
  serverId?: Types.ObjectId | string
) => {
    const query = keepKeys(fields, ['senderId', 'roomId', 'body', 'emojis']);

  const message = (serverId)
    ? new MessageChannel({ ...query, serverId })
    : new MessageDirect(query);

  if (attachments && attachments.length > 0) {
    for (const attachment of attachments) {
      const { filename, mimetype, bytes } = attachment;

      message.attachments.push({
        url: cloudinaryService.generateUrl(
          filename,
          `${serverId ? `servers/${serverId}/channels` : 'dms'}/${fields.roomId}/${message._id}/attachments`
        ),
        filename,
        mimetype,
        bytes,
      });
    }
  }

  const populateOptions = [
    { path: 'sender', select: 'displayName username avatarUrl' }
  ];

  if (serverId) populateOptions.push({
    path: 'serverMember',
    select: 'displayName -userId',
  });

  const [populatedMessage] = await Promise.all([
    message.populate(populateOptions),
    message.save(),
  ]);
  
  return populatedMessage;
};

const update = async (
  id: string,
  fields: {
    body: string,
    emojis: IMessageEmoji[]
  },
) => {
  const { body, emojis } = fields;

  const updatedMessage = await Message.findByIdAndUpdate(id, {
    $set: {
      body,
      emojis,
      updatedAt: new Date(),
    },
  }, { new: true });

  return updatedMessage;
};

const remove = async (id: string) => {
  const message = await Message.findById(id);

  if (!message) throw new CustomError(400, 'Message not found.');

  const { attachments } = message;

  if (attachments.length > 0) await cloudinaryService.deleteByFolder(`${message.type === 'channel'
    ? `servers/${message.serverId}/channels`
    : 'dms'
  }/${message.roomId}/messages/${message.id}/attachments`);

  await Promise.all([
    message.deleteOne(),
    Reaction.deleteMany({ messageId: id }),
  ]);

  return message;
};

export const getUnreadTimestamps = async (userId: string | Types.ObjectId, type: 'dm' | 'channel') => {
  const rooms = type === 'dm'
    ? await DM.find({
      participantIds: new Types.ObjectId(userId),
    }).populate('_id')
    : await ServerMember.find({ userId: new Types.ObjectId(userId) })
      .select('serverId')
      .populate('server', 'channels');

  if (!rooms) return null;

  const roomIds = type === 'dm'
    ? rooms.map(room => room._id)
    : rooms.flatMap(
      (room: any) => room.server.channels.map((channel: any) => channel._id)
    );

  const lastTimestamps = await Message.aggregate([
    { $match: { roomId: { $in: roomIds } } },
    { $sort: { _id: 1 } },
    { $group: {
      _id: '$roomId',
      lastAt: { $last: '$createdAt' },
    } },
    { $project: {
      _id: 0,
      roomId: '$_id',
      lastAt: 1,
    } },
  ]);

  return lastTimestamps;
};

export const messageService = {
  getOne,
  getMany,
  getUnreadTimestamps,
  create,
  update,
  remove,
};