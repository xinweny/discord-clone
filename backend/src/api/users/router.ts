import { Router } from 'express';

import { relationRouter } from './relations/router.js';
import { mutualsRouter } from './mutuals/router.js';

import { userController } from './controller.js';
import { userServerRouter } from './servers/router.js';
import { userDmRouter } from './dms/router.js';
import { notificationRouter } from './notifications/router.js';

const userRouter = Router();

userRouter.use('/:userId/relations', relationRouter);

userRouter.use('/:userId/mutuals', mutualsRouter);

userRouter.use('/:userId/servers', userServerRouter);

userRouter.use('/:userId/dms', userDmRouter);

userRouter.use('/:userId/notifications', notificationRouter);

userRouter.get('/:userId', userController.getUser);

userRouter.put('/:userId', userController.updateUser);

export { userRouter };