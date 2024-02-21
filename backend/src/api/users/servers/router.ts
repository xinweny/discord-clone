import { Router } from 'express';

import { userMemberRouter } from '../members/router.js';

import { userServersController } from './controller.js';

const userServerRouter = Router({ mergeParams: true });

userServerRouter.get('/', userServersController.getJoinedServers);

userServerRouter.use('/:serverId/member', userMemberRouter);

export { userServerRouter };