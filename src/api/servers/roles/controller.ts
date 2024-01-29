import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';
import { validateFields } from '@middleware/validateFields';

import { roleService } from './service';

const getRole: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const { serverId, roleId } = req.params;
      const { withCount } = req.query;

      const role = await roleService.getById(serverId, roleId, withCount === 'true');

      res.json({ data: role });
    }
  )
];

const getRoles: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const { withCount } = req.query;
      const roles = await roleService.getMany(req.params.serverId, withCount === 'true');

      res.json({ data: roles });
    }
  )
];

const createRole: RequestHandler[] = [
  ...validateFields(['roleName', 'color']),
  authenticate,
  authorize.server('manageRoles'),
  tryCatch(
    async (req, res) => {
      const role = await roleService.create(req.params.serverId, req.body);

      res.json({
        data: role,
        message: 'Role created successfully.',
      });
    }
  )
];

const updateRole: RequestHandler[] = [
  ...validateFields(['roleName', 'color']),
  authenticate,
  authorize.server('manageRoles'),
  tryCatch(
    async (req, res) => {
      const { serverId, roleId } = req.params;

      const role = await roleService.update(serverId, roleId, req.body);

      res.json({
        data: role,
        message: 'Role updated successfully.',
      });
    }
  )
];

const updateRoles: RequestHandler[] = [
  authenticate,
  authorize.server('manageRoles'),
  tryCatch(
    async (req, res) => {
      const { serverId } = req.params;

      const roles = await roleService.updateMany(serverId, req.body.roles);

      res.json({
        data: roles,
        message: 'Role updated successfully.',
      });
    }
  )
];

const deleteRole: RequestHandler[] = [
  authenticate,
  authorize.server('manageRoles'),
  tryCatch(
    async (req, res) => {
      const { serverId, roleId } = req.params;

      const role = await roleService.remove(serverId, roleId);

      res.json({
        data: role,
        message: 'Role deleted successfully.',
      });
    }
  )
];

export const roleController = {
  getRole,
  getRoles,
  createRole,
  updateRole,
  updateRoles,
  deleteRole,
};