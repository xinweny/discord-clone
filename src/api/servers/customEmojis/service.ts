import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError';

import { cloudinaryService } from '@services/cloudinary';

import { Server } from '@api/servers/model';

const getMany = async (serverId: Types.ObjectId | string) => {
  const data = await Server.findById(serverId, 'customEmojis');

  return data?.customEmojis;
};

const create = async (
  serverId: Types.ObjectId | string,
  file: Express.Multer.File,
  fields: {
    creatorId: Types.ObjectId | string,
    name: string,
  }) => {
  const server = await Server.findById(serverId);

  if (!server) return null;

  const cloudRes = await cloudinaryService.upload(file, `emojis/${serverId.toString()}`);

  server.customEmojis.push({
    ...fields,
    url: cloudRes.secure_url,
  });

  const emoji = server.customEmojis.slice(-1)[0];

  await server.save();

  return emoji;
};

const update = async (
  serverId: Types.ObjectId | string,
  emojiId: Types.ObjectId | string,
  fields: { name: string }
) => {
  const { name } = fields;

  const server = await Server.findById(serverId, 'customEmojis');

  const emoji = server?.customEmojis.id(emojiId);

  if (!emoji) throw new CustomError(400, 'Emoji not found');

  emoji.name = name;

  await server?.save();

  return emoji;
};

const remove = async (serverId: Types.ObjectId | string, emojiId: Types.ObjectId | string) => {
  const server = await Server.findById(serverId);

  const emoji = server?.customEmojis.id(emojiId);

  if (!emoji) throw new CustomError(400, 'Emoji not found');

  await Promise.all([
    Server.updateOne({ _id: serverId }, {
      $pull: { customEmojis: { _id: emojiId } },
    }),
    cloudinaryService.deleteByUrl(emoji.url),
  ])
};

export const customEmojiService = {
  getMany,
  create,
  update,
  remove,
};