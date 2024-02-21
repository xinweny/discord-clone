import { Router } from 'express';

import { authRouter } from '@api/auth/router.js';
import { dmRouter } from '@api/dms/router.js';
import { serverRouter } from '@api/servers/router.js';
import { userRouter } from '@api/users/router.js';
import { uploadRouter } from './upload/router.js';
import { webRtcRouter } from './webrtc/router.js';
import { serverInviteRouter } from './serverInvites/router.js';
import { statusRouter } from './statuses/router.js';
import { customEmojiRouter } from './customEmojis/router.js';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

apiRouter.use('/dms', dmRouter);

apiRouter.use('/servers', serverRouter);

apiRouter.use('/invites', serverInviteRouter);

apiRouter.use('/emojis', customEmojiRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/upload', uploadRouter);

apiRouter.use('/rtc', webRtcRouter);

apiRouter.use('/statuses', statusRouter);

export { apiRouter };