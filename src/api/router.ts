import { Router } from 'express';

import { authRouter } from '@api/auth/router';
import { dmRouter } from '@api/dms/router';
import { serverRouter } from '@api/servers/router';
import { userRouter } from '@api/users/router';
import { uploadRouter } from './upload/router';
import { webRtcRouter } from './webrtc/router';
import { serverInviteRouter } from './serverInvites/router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

apiRouter.use('/dms', dmRouter);

apiRouter.use('/servers', serverRouter);

apiRouter.use('/invites', serverInviteRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/upload', uploadRouter);

apiRouter.use('/rtc', webRtcRouter);

export { apiRouter };