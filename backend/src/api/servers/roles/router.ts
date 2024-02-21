import { Router } from 'express';

import { roleController } from './controller.js';

const roleRouter = Router({ mergeParams: true });

roleRouter.get('/', roleController.getRoles);

roleRouter.post('/', roleController.createRole);

roleRouter.put('/', roleController.updateRoles);

roleRouter.get('/:roleId', roleController.getRole);

roleRouter.put('/:roleId', roleController.updateRole);

roleRouter.delete('/:roleId', roleController.deleteRole);

export { roleRouter };