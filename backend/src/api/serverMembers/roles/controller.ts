import type { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { serverMemberRoleService } from './service.js';

const getRoles: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  async (req, res) => {
    const { serverId, memberId } = req.params;

    const roles = await serverMemberRoleService.getMany(serverId, memberId);

    res.json({ data: roles });
  }
];

const addRole: RequestHandler[] = [
  authenticate,
  authorize.server('manageRoles'),
  async (req, res) => {
    const { serverId, memberId } = req.params;
    const { roleId } = req.body;

    const role = await serverMemberRoleService.add(serverId, memberId, roleId);

    res.json({
      data: role,
      message: 'Role added to member successfully.',
    });
  }
];

const deleteRole: RequestHandler[] = [
  authenticate,
  authorize.server('manageRoles'),
  async (req, res) => {
    const { serverId, memberId, roleId } = req.params;

    const role = await serverMemberRoleService.remove(serverId, memberId, roleId);

    res.json({
      data: role,
      message: 'Role removed from member successfully.',
    });
  }
];

export const serverMemberRoleController = {
  getRoles,
  addRole,
  deleteRole,
};