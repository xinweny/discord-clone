import { Router } from 'express';

import { userMemberRouter } from '../members/router';

import { userServersController } from './controller';

const userServerRouter = Router({ mergeParams: true });

userServerRouter.get('/', userServersController.getJoinedServers);

userServerRouter.use('/:serverId/member', userMemberRouter);

export { userServerRouter };