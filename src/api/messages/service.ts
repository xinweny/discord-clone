import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError';

import { Message } from './model';
import { MessageChannel, MessageDirect } from './discriminators';

import { Reaction } from './reactions/model';
import { reactionService } from './reactions/service';

import type { ICustomCount, IDefaultCount } from './reactionCounts/discriminators';
import { reactionCountService } from './reactionCounts/service';

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
    .sort({ _id: 1 })
    .limit(limit)
    .populate(populateOptions);

  const lastMessage = messages[0];

  return {
    messages,
    next: lastMessage ? lastMessage._id : null,
  };
}

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
  serverId?: Types.ObjectId | string) => {
  const message = (serverId)
    ? new MessageChannel({ ...fields, serverId })
    : new MessageDirect(fields);

  if (attachments && attachments.length > 0) {
    for (const attachment of attachments) {
      const { filename, mimetype, bytes } = attachment;

      message.attachments.push({
        url: cloudinaryService.generateUrl(
          filename,
          `attachments/${serverId ? `servers/${serverId}/` : 'dms/'}${fields.roomId}/${message._id}`
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

  await message.save();

  const populatedMessage = await message
    .populate(populateOptions);
  
  return populatedMessage;
};

const update = async (
  id: string,
  body: string,
) => {
  const updatedMessage = await Message.findByIdAndUpdate(id, {
    $set: { body },
  }, { new: true });

  return updatedMessage;
};

const remove = async (id: string) => {
  const message = await Message.findById(id);

  if (!message) throw new CustomError(400, 'Message not found.');

  const { attachments } = message;

  if (attachments.length > 0) {
    await Promise.all(attachments.map(
      attachment => cloudinaryService.deleteByUrl(attachment.url))
    );
  }

  await Promise.all([
    message.deleteOne(),
    Reaction.deleteMany({ messageId: id }),
  ]);

  return message;
};

const reactNew = async (
  messageId: Types.ObjectId | string,
  userId: Types.ObjectId | string,
  emoji: { name: string } & (
    {
      custom: true;
      emojiId: Types.ObjectId;
      url: string;
    } | {
      custom: false;
      unified: string;
      native: string;
    }
  )
) => {
  const reactionCount = await reactionCountService.createCount(messageId, emoji);

  await reactionService.create({
    reactorId: userId,
    countId: reactionCount._id,
  });

  return reactionCount;
};

const react = async (
  userId: Types.ObjectId | string,
  countId: Types.ObjectId | string,
) => {
  const reaction = await reactionService.create({
    reactorId: userId,
    countId,
  });

  if (!reaction) return null;

  const reactionCount = await reactionCountService.increment(countId);

  return reactionCount;
};

const unreact = async (
  countId: string,
  
) => {
  const message = await Message.findById(messageId);

  if (!message) return null;

  const custom = !!reaction.emojiId;
  const emoji = custom ? reaction.emojiId : reaction.emoji;

  const fieldName = custom ? 'emojiId' : 'emoji';
  const identifierField = `reactions.${fieldName}`;

  const messageReaction = custom
    ? message.reactionCounts.find(reaction => reaction.emojiId?.toString() === emoji)
    : message.reactionCounts.find(reaction => reaction.emoji === emoji);

  if (!messageReaction) return null;

  const unreactedMessage = (messageReaction.count === 1) 
    ? await Message.findByIdAndUpdate(messageId, {
      $pull: { reactions: { [fieldName]: emoji } }
    }, { safe: true, new: true })
    : await Message.findOneAndUpdate({
      _id: messageId,
      [identifierField]: emoji,
    }, {
      $inc: { 'reactions.$.count': -1 },
    }, { new: true });

  return unreactedMessage;
};

export const messageService = {
  getOne,
  getMany,
  create,
  update,
  remove,
  reactNew,
  react,
  // unreact,
};