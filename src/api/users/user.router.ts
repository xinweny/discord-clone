import { Router } from 'express';

import { relationRouter } from './relations';
import { mutualsRouter } from './mutuals';

import { userController } from '.';

const userRouter = Router();

userRouter.use('/:userId/relations', relationRouter);

userRouter.use('/:userId/mutuals', mutualsRouter);

userRouter.get('/:userId', userController.getUser);

userRouter.put('/:userId', userController.updateUser);

export { userRouter };