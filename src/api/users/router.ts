import { Router } from 'express';

import { relationRouter } from './relations/router';
import { mutualsRouter } from './mutuals/router';

import { userController } from './controller';
import { userServerRouter } from './servers/router';
import { userDmRouter } from './dms/router';
import { userStatusRouter } from './status/router';
import { readStatusRouter } from './readStatus/router';

const userRouter = Router();

userRouter.use('/:userId/relations', relationRouter);

userRouter.use('/:userId/mutuals', mutualsRouter);

userRouter.use('/:userId/servers', userServerRouter);

userRouter.use('/:userId/dms', userDmRouter);

userRouter.use('/:userId/status', userStatusRouter);

userRouter.use('/:userId/read', readStatusRouter)

userRouter.get('/:userId', userController.getUser);

userRouter.put('/:userId', userController.updateUser);

export { userRouter };