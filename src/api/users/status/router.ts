import { Router } from 'express';

import { userStatusController } from './controller';

const userStatusRouter = Router({ mergeParams: true });

userStatusRouter.get('/', userStatusController.getUserStatus);

export { userStatusRouter };