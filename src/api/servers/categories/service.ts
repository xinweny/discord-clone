import { Types } from 'mongoose';

import { formatSetQuery } from '@helpers/formatSetQuery';
import { CustomError } from '@helpers/CustomError';

import { Server } from '@api/servers/model';

const get = async (serverId: Types.ObjectId | string, categoryId?: Types.ObjectId | string) => {
  const server = await Server.findById(
    serverId,
    categoryId ? { roles: { $elemMatch: { _id: categoryId } } } : 'categories'
  );

  if (!server) throw new CustomError(400, 'Server not found.');

  return (categoryId) ? server.categories[0] : server.categories;
};

const create = async (serverId: Types.ObjectId | string, name: string) => {
  const server = await Server.findById(serverId);

  if (!server) return null;

  server.categories.push({ name });

  await server.save();

  const category = server.categories.slice(-1)[0];

  return category;
};

const update = async (serverId: Types.ObjectId | string, categoryId: Types.ObjectId | string, name: string) => {
  const server = await Server.findOneAndUpdate({
    _id: serverId,
    'categories._id': categoryId,
  }, {
    $set: formatSetQuery({ name }, 'categories'),
  }, { new: true, runValidators: true });

  const category = server?.categories.id(categoryId);

  return category;
};

const remove = async (serverId: Types.ObjectId | string, categoryId: Types.ObjectId | string) => {
  const server = await Server.findByIdAndUpdate(serverId, {
    $pull: { categories: { _id: categoryId } },
  });

  const category = server?.categories.id(categoryId);

  return category;
};

const updateChannel = async (serverId: Types.ObjectId | string, channelId: Types.ObjectId | string, toId?: Types.ObjectId | string) => {
  const server = await Server.findOneAndUpdate({
    _id: serverId,
    'channels._id': channelId,
    ...(toId && { 'categories._id': toId }),
  }, {
    $pull: { 'categories.channelIds': channelId },
    ...(toId && {
      $push: { 'categories.$.channelIds': channelId },
    }),
    ...(toId
      ? { $set: { 'channels.$.categoryId': toId } }
      : { $unset: { 'channels.$.categoryId': '' } }
    ),
  });

  const categories = server?.categories;

  return categories;
};

export const categoryService = {
  get,
  create,
  update,
  remove,
  updateChannel,
};