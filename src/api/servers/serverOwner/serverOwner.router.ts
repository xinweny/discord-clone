import { Router } from 'express';

import { serverOwnerController } from '.';

const serverOwnerRouter = Router({ mergeParams: true });

serverOwnerRouter.put('/', serverOwnerController.changeServerOwnership);

export { serverOwnerRouter };