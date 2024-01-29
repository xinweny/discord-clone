import { Router } from 'express';

import { serverOwnerController } from './controller';

const serverOwnerRouter = Router({ mergeParams: true });

serverOwnerRouter.put('/', serverOwnerController.changeServerOwnership);

export { serverOwnerRouter };