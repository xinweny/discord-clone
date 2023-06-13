import { Types } from 'mongoose';

import formatSetQuery from '../helpers/formatSetQuery';

import ServerMember from '../models/ServerMember.model';
import Server from '../models/Server.model';

const create = async (serverId: Types.ObjectId | string, fields: {
  name: string,
  color: string,
  permissions: { [key: string]: boolean },
}) => {
  const server = await Server.findById(serverId);

  if (!server) return null;

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
  }, { new: true });

  const role = server?.roles.id(roleId);

  return role;
};

const remove = async (serverId: Types.ObjectId | string, roleId: Types.ObjectId | string) => {
  const server = await Server.findById(serverId);

  if (!server) return null;

  const role = server.roles.id(roleId);

  server.roles.pull(roleId);

  await Promise.all([
    server.save(),
    ServerMember.updateMany(
      { roleIds: roleId },
      { $pull: { roleIds: roleId } }
    ),
  ]);

  return role;
};

export default {
  create,
  update,
  remove,
};