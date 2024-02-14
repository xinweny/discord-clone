import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError';

import { cloudinaryService } from '@services/cloudinary';

import { CustomEmoji } from './model';

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

const create = async (
  serverId: Types.ObjectId | string,
  fields: {
    creatorId: Types.ObjectId | string,
    name: string,
  },
  filename: string) => {
  const emojiId = new Types.ObjectId();

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
  const emoji = await CustomEmoji.findOneAndDelete({ serverId, emojiId }, { returnOriginal: true });

  if (!emoji) throw new CustomError(400, 'Emoji not found');

  await Promise.all([
    CustomEmoji.findByIdAndDelete({ _id: emojiId }),
    cloudinaryService.deleteByUrl(emoji.url),
  ]);

  return emoji;
};

export const customEmojiService = {
  getMany,
  create,
  update,
  remove,
};