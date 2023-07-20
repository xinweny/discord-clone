import { Router } from 'express';

import { relationRouter } from './relations/router';
import { mutualsRouter } from './mutuals/router';

import { userController } from './controller';
import { userServersRouter } from './servers/router';

const userRouter = Router();

userRouter.use('/:userId/relations', relationRouter);

userRouter.use('/:userId/mutuals', mutualsRouter);

userRouter.use('/:userId/servers', userServersRouter);

userRouter.get('/:userId', userController.getUser);

userRouter.put('/:userId', userController.updateUser);

export { userRouter };