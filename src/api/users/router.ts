import { Router } from 'express';

import { relationRouter } from './relations/router';
import { mutualsRouter } from './mutuals/router';

import { userController } from './controller';

const userRouter = Router();

userRouter.use('/:userId/relations', relationRouter);

userRouter.use('/:userId/mutuals', mutualsRouter);

userRouter.get('/:userId', userController.getUser);

userRouter.put('/:userId', userController.updateUser);

export { userRouter };