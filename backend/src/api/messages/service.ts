import { Types } from 'mongoose';
import data from '@emoji-mart/data' assert { type: 'json' };
import emojiMart from 'emoji-mart';

import { CustomError } from '@helpers/CustomError.js';
import { keepKeys } from '@helpers/keepKeys.js';

import { Message, IMessageEmojiDict } from './model.js';
import { MessageChannel, MessageDirect } from './discriminators.js';

import { Reaction } from '../reactions/model.js';
import { DM } from '@api/dms/model.js';
import { ServerMember } from '@api/serverMembers/model.js';
import { CustomEmoji } from '@api/customEmojis/model.js';

import { cloudinaryService } from '@services/cloudinary.js';

const { init, getEmojiDataFromNative } = emojiMart;

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
  
  const messagesWithEmojis = await Promise.all(messages.map(async (m) => {
    try {
      const body = m.body;
  
      const emojiDict: IMessageEmojiDict = {};

      const customEmojiMatches = body.match(/(<:.+?:[a-z0-9]+>)/gu);

      const getCustomEmojis = async () => {
        if (!customEmojiMatches) return;

        const customEmojis = await CustomEmoji.find({
          _id: {
            $in: customEmojiMatches.map(m => {
              return new Types.ObjectId(m.split(':').slice(-1)[0].replace('>', ''));
            }),
          },
        });

        for (const e of customEmojis) {
          const { id, name, url } = e;

          emojiDict[id] = { shortcode: `:${name}:`, url };
        }

        return;
      };
      
      const twemojiMatches = body.match(/(\p{Emoji_Presentation})/gu);

      if (twemojiMatches) await init({ data });

      const getTwemojis = twemojiMatches
        ? twemojiMatches.map(async (match) => {
          return await getEmojiDataFromNative(match).then(emoji => {
            if (emoji) emojiDict[match] = {
              shortcode: `:${emoji.id}:`,
            };
          });
        })
        : [];
      
      await Promise.all([
        getCustomEmojis(),
        ...getTwemojis
      ]);
    
      return { ...(m.toObject()), emojis: emojiDict };
    } catch {
      return m;
    }
  }));

  return {
    messages: messagesWithEmojis,
    next: messages.length === limit && lastMessage
      ? lastMessage._id
      : null,
  };
};

const create = async (
  fields: {
    senderId: Types.ObjectId | string,
    roomId: Types.ObjectId | string,
    body: string,
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
          `${serverId ? `servers/${serverId}/channels` : 'dms'}/${fields.roomId}/messages/${message._id}/attachments`
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
  },
) => {
  const { body } = fields;

  const updatedMessage = await Message.findByIdAndUpdate(id, {
    $set: {
      body,
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
  }/${message.roomId}/messages/${message.id}/attachments`, true);

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