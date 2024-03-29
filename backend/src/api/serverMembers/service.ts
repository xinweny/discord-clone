import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys.js';
import { CustomError } from '@helpers/CustomError.js';

import { Server } from '@api/servers/model.js';
import { ReadStatus } from '@api/users/notifications/model.js';
import { ServerMember } from './model.js';

const getById = async (id: Types.ObjectId | string) => {
  const member = await ServerMember
    .findById(id)
    .populate([
      { path: 'user', select: 'avatarUrl username createdAt' },
    ]);

  return member;
};

const getOne = async (userId: Types.ObjectId | string, serverId: Types.ObjectId | string) => {
  const member = await ServerMember
    .findOne({ userId, serverId })
    .populate([
      { path: 'user', select: 'avatarUrl username createdAt customStatus' },
    ]);

  return member;
};

const getMany = async (
  fields: {
    userId?: Types.ObjectId | string,
    serverId?: Types.ObjectId | string,
  },
  select = 'userId serverId displayName',
  withPopulate = true,
) => {
  const members = withPopulate
    ? await ServerMember
      .find(fields)
      .select(select)
      .populate('user', 'avatarUrl username createdAt')
    : await ServerMember
      .find(fields)
      .select(select);

  return members;
};

const create = async (fields: {
  userId: Types.ObjectId | string,
  serverId: Types.ObjectId | string,
  displayName: string,
}) => {
  const server = await Server.findById(fields.serverId);
  
  if (!server) return null;

  const member = new ServerMember(fields);
  member.roleIds.push(server.roles[0]._id);

  await member.save();

  await Server.findByIdAndUpdate(fields.serverId, {
    $inc: { memberCount: 1 },
  });

  return member;
};

const update = async (id: Types.ObjectId | string, fields: {
  displayName?: string,
  bio?: string,
  bannerColor?: string,
  roleIds?: Types.ObjectId[] | string[],
}) => {
  const updateQuery = keepKeys(fields, ['displayName', 'bio', 'bannerColor', 'roleIds']);

  const member = await ServerMember.findByIdAndUpdate(id, {
    $set: updateQuery,
  }, { new: true });

  return member;
};

const remove = async (id: Types.ObjectId | string) => {
  const serverMember = await ServerMember.findById(id);

  if (!serverMember) throw new CustomError(400, 'Server member not found.');

  await ServerMember.findByIdAndDelete(id);

  const { userId, serverId } = serverMember;

  await Promise.all([
    Server.findByIdAndUpdate(serverId, {
      $inc: { memberCount: -1 },
    }),
    ReadStatus.deleteMany({ userId, serverId }),
  ]);

  return serverMember;
};

const checkMembership = async (serverId: Types.ObjectId | string, userId: Types.ObjectId | string) => {
  const member = await ServerMember.findOne({ serverId, userId });

  return member;
};

export const serverMemberService = {
  getById,
  getOne,
  getMany,
  create,
  update,
  remove,
  checkMembership,
};