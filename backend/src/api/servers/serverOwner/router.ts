import { Router } from 'express';

import { serverOwnerController } from './controller.js';

const serverOwnerRouter = Router({ mergeParams: true });

serverOwnerRouter.put('/', serverOwnerController.changeServerOwnership);

export { serverOwnerRouter };