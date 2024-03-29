import { Router } from 'express';

import { serverMemberRoleController } from './controller.js';

const serverMemberRoleRouter = Router({ mergeParams: true });

serverMemberRoleRouter.get('/', serverMemberRoleController.getRoles);

serverMemberRoleRouter.post('/', serverMemberRoleController.addRole);

serverMemberRoleRouter.delete('/:roleId', serverMemberRoleController.deleteRole);

export { serverMemberRoleRouter };