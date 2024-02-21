import { Router } from 'express';

import { statusController } from './controller.js';

const statusRouter = Router({ mergeParams: true });

statusRouter.get('/users/:userId/friends', statusController.getFriendStatuses);

statusRouter.get('/users/:userId', statusController.getUserStatus);

statusRouter.get('/servers/:serverId/members', statusController.getServerMemberStatuses);

export { statusRouter };