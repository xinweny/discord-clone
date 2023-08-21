import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError';

import { ServerMember } from '../model';

const getMany = async (id: Types.ObjectId | string) => {
  const member = await ServerMember
    .findById(id, 'roleIds')
    .populate('roles', 'name color');

  return member;
};

const add = async (id: Types.ObjectId | string, roleId: Types.ObjectId | string) => {
  const member = await ServerMember
    .findByIdAndUpdate(id, {
      $push: { roleIds: roleId },
    }, { new: true })
    .populate('roles', 'name color');

  return member?.roles?.slice(0, -1);
};

const remove = async (id: Types.ObjectId | string, roleId: Types.ObjectId | string) => {
  const member = await ServerMember.findById(id);

  if (!member) throw new CustomError(400, 'Server not found.');

  const role = (await member.populate('roles', 'name color')).id(roleId);

  member.roleIds = member.roleIds.filter(rId => rId !== roleId);

  await member.save();

  return role;
};

export const serverMemberRoleService = {
  getMany,
  add,
  remove,
};