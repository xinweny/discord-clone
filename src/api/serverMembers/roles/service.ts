import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError';

import { ServerMember } from '../model';
import { Server } from '@api/servers/model';

const getMany = async (serverId: Types.ObjectId | string, memberId: Types.ObjectId | string) => {
  const member = await ServerMember
    .findById(memberId, 'roleIds');

  if (!member) return null;

  const { roleIds } = member;

  const server = await Server.findById(serverId, 'roles');

  const memberRoles = server?.roles.filter(role => roleIds.includes(role._id.toString()));

  return memberRoles;
};

const add = async (
  serverId: Types.ObjectId | string,
  memberId: Types.ObjectId | string,
  roleId: Types.ObjectId | string
) => {
  const server = await Server.findById(serverId, 'roles');

  const role = server?.roles.find(role => role._id.toString() === roleId.toString());

  if (!role) throw new CustomError(400, 'Server role not found.');

  const member = await ServerMember
    .findByIdAndUpdate(memberId, {
      $addToSet: { roleIds: roleId },
    }, { new: true });

  if (!member) return null;

  return role;
};

const remove = async (
  serverId: Types.ObjectId | string,
  memberId: Types.ObjectId | string,
  roleId: Types.ObjectId | string
) => {
  const [server, member] = await Promise.all([
    Server.findById(serverId, 'roles'),
    ServerMember.findById(memberId, 'roleIds'),
  ]);

  if (!server || !member) throw new CustomError(400, 'Server not found.');

  const role = server.roles.id(roleId);

  if (!role) throw new CustomError(400, 'Role not found');

  member.roleIds = member.roleIds.filter(rId => rId.toString() !== roleId.toString());

  await member.save();

  return role;
};

export const serverMemberRoleService = {
  getMany,
  add,
  remove,
};