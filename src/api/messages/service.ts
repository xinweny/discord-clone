import { Types } from 'mongoose';
import mime from 'mime/lite';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import emojilib from 'emojilib';

import { CustomError } from '@helpers/CustomError';

import { Message } from './model';
import { MessageChannel, MessageDirect } from './discriminators';

import { Reaction, IReaction } from './reactions/model';

import { cloudinaryService } from '@services/cloudinary';

const getOne = async (id: string) => {
  const message = await Message.findById(id);

  return message;
}

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
};

const react = async (
  messageId: Types.ObjectId | string,
  emoji: string | {
    id: string,
    url: string,
    name: string,
  }
) => {
  const message = await Message.findById(messageId);

  if (!message) return null;

  const custom = typeof emoji !== 'string';

  let identifier, updateField, emojiExists, setQuery;

  if (custom) {
    identifier = emoji.id;
    updateField = 'reactions.emojiId';

    setQuery = {
      emojiId: emoji.id,
      url: emoji.url,
      name: emoji.name,
      custom: true,
    };

    emojiExists = message.reactionCounts.some(reaction => reaction.emojiId?.equals(emoji.id));
  } else {
    identifier = emoji;
    updateField = 'reactions.emoji';

    setQuery = {
      emoji,
      name: emojilib[emoji][0].replace(' ', '_'),
      custom: false,
    };

    emojiExists = message.reactionCounts.some(reaction => reaction.emoji === emoji);
  }

  const updateQuery = emojiExists
  ? { $inc: { 'reactions.$.count': 1 } }
  : {
      $push: {
        reactions: {
          ...setQuery,
          count: 0,
        }
      }
    };

  const reactedMessage = await Message.findOneAndUpdate(
    {
      _id: messageId,
      ...(emojiExists && { [updateField]: identifier }),
    },
    updateQuery,
    { new: true }
  );

  return reactedMessage;
};

const unreact = async (
  messageId: string,
  reaction: IReaction,
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
  react,
  unreact,
};