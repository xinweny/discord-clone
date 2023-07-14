import { Router } from 'express';

import { authRouter } from '@api/auth';
import { dmRouter } from '@api/dms';
import { serverRouter } from '@api/servers';
import { userRouter } from '@api/users';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

apiRouter.use('/dms', dmRouter);

apiRouter.use('/servers', serverRouter);

apiRouter.use('/users', userRouter);

export { apiRouter };