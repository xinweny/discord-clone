import { Types } from 'mongoose';

import { formatSetQuery } from '@helpers/formatSetQuery.js';
import { CustomError } from '@helpers/CustomError.js';

import { Server } from '@api/servers/model.js';
import { ServerMember } from '@api/serverMembers/model.js';

const getById = async (
  serverId: Types.ObjectId | string,
  roleId: Types.ObjectId | string,
  withCount = false,
) => {
  const server = (withCount)
    ? await Server.findById(
      serverId,
      { roles: { $elemMatch: { _id: roleId } } }
    )
    .populate('roles.memberCount')
    : await Server.findById(
      serverId,
      { roles: { $elemMatch: { _id: roleId } } }
    );

  if (!server) throw new CustomError(400, 'Server not found.');

  return server.roles[0];
};

const getMany = async (
  serverId: Types.ObjectId | string,
  withCount = false,
) => {
  const server = (withCount)
    ? await Server
      .findById(serverId, 'roles')
      .populate('roles.memberCount')
    : await Server.findById(serverId, 'roles');

  if (!server) throw new CustomError(400, 'Server not found.');

  return server.roles;
};

const create = async (serverId: Types.ObjectId | string, fields: {
  name: string,
  color: string,
}) => {
  const server = await Server.findById(serverId);

  if (!server) return null;

  console.log(fields);

  server.roles.push(fields);

  await server.save();

  const role = server.roles.slice(-1)[0];

  return role;
};

const update = async (
  serverId: Types.ObjectId | string,
  roleId: Types.ObjectId | string,
  fields: {
    name?: string,
    color?: string,
    permissions?: { [key: string]: boolean },
  }
) => {
  const server = await Server.findOneAndUpdate({
    _id: serverId,
    'roles._id': roleId,
  }, {
    $set: formatSetQuery(fields, 'roles'),
  }, { new: true, runValidators: true });

  const role = server?.roles.id(roleId);

  return role;
};

const updateMany = async (
  serverId: Types.ObjectId | string,
  roles: {
    _id: string,
    name: string,
    color: string,
    permissions: { [key: string]: boolean },
  }[]
) => {
  const server = await Server.findByIdAndUpdate({
    _id: serverId,
  }, {
    $set: roles,
  }, { new: true, runValidators: true });

  return server?.roles.map(role => role.toJSON());
};

const remove = async (serverId: Types.ObjectId | string, roleId: Types.ObjectId | string) => {
  const server = await Server.findById(serverId);

  if (!server) return null;

  const role = server.roles.id(roleId);

  if (roleId === server.roles[0]._id.toString()) throw new CustomError(400, 'Cannot delete default role.');

  server.roles.pull(roleId);

  await Promise.all([
    server.save(),
    ServerMember.updateMany(
      { serverId, roleIds: roleId },
      { $pull: { roleIds: roleId } }
    ),
  ]);

  return role;
};

export const roleService = {
  getById,
  getMany,
  create,
  update,
  updateMany,
  remove,
};