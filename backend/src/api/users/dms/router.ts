import { Router } from 'express';

import { userDmsController } from './controller.js';

const userDmRouter = Router({ mergeParams: true });

userDmRouter.get('/', userDmsController.getMyDms);

export { userDmRouter };