import { Types } from 'mongoose';
import { nanoid } from 'nanoid';

import env from '@config/env';

import { ServerInvite } from './model';

const getOne = async (fields: {
  urlId?: string,
  serverId?: string,
}) => {
  const { serverId, urlId } = fields;

  const invite = await ServerInvite.findOne({
    ...(serverId && { serverId }),
    ...(urlId && { url: `${env.BASE_SHORT_URL}/${urlId}` }),
  });

  return invite;
};

const getMany = async (urlIds: string[]) => {
  const invites = await ServerInvite.find({
    url: { $in: urlIds.map(urlId =>  `${env.BASE_SHORT_URL}/${urlId}`) },
  });

  return invites;
};

const create = async (serverId: Types.ObjectId | string) => {
  const urlId = nanoid(8);

  const invite = new ServerInvite({
    serverId,
    url: `${env.BASE_SHORT_URL}/${urlId}`,
  });

  await invite.save();

  return invite;
};

const updateUrlId = async (serverId: Types.ObjectId | string) => {
  const urlId = nanoid(8);

  const invite = await ServerInvite.findOneAndUpdate(
    { serverId },
    { url: `${env.BASE_SHORT_URL}/${urlId}` },
    { new: true }
  );

  return invite;
};

const remove = async (serverId: Types.ObjectId | string) => {
  const invite = await ServerInvite.findOneAndDelete({ serverId });

  return invite;
};

export const serverInviteService = {
  getOne,
  getMany,
  create,
  updateUrlId,
  remove,
};