import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError.js';

import { cloudinaryService } from '@services/cloudinary.js';

import { CustomEmoji } from './model.js';

const getMany = async (serverIds: Types.ObjectId[] | string[], populate = false) => {
  const customEmojis = populate
    ? await CustomEmoji
      .find({
        serverId: { $in: serverIds },
      })
      .populate('creator', 'username avatarUrl')
    : await CustomEmoji
      .find({
        serverId: { $in: serverIds },
      });

  return customEmojis;
};

const getManyByIds = async (emojiIds: Types.ObjectId[] | string[]) => {
  const customEmojis = await CustomEmoji.find({ _id: { $in: emojiIds } });

  return customEmojis;
};

const create = async (
  fields: {
    creatorId: Types.ObjectId | string,
    name: string,
    serverId: Types.ObjectId | string,
  },
  filename: string) => {
  const emojiId = new Types.ObjectId();

  const { serverId } = fields;

  const emoji = new CustomEmoji({
    _id: emojiId,
    ...fields,
    url: cloudinaryService.generateUrl(filename, `servers/${serverId}/emojis`, emojiId.toString()),
  });

  await emoji.save();

  return emoji;
};

const update = async (
  serverId: Types.ObjectId | string,
  emojiId: Types.ObjectId | string,
  fields: { name: string }
) => {
  const { name } = fields;

  const emoji = await CustomEmoji.findOneAndUpdate(
    { serverId, emojiId },
    { name },
    { new: true }
  );

  if (!emoji) throw new CustomError(400, 'Emoji not found');

  return emoji;
};

const remove = async (
  serverId: Types.ObjectId | string,
  emojiId: Types.ObjectId | string
) => {
  const emoji = await CustomEmoji.findByIdAndDelete({ _id: emojiId, serverId }, { returnOriginal: true });

  if (!emoji) throw new CustomError(400, 'Emoji not found');

  await Promise.all([
    CustomEmoji.findByIdAndDelete({ _id: emojiId }),
    cloudinaryService.deleteByUrl(emoji.url),
  ]);

  return emoji;
};

export const customEmojiService = {
  getMany,
  getManyByIds,
  create,
  update,
  remove,
};