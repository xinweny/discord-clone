import { Router } from 'express';

import { userServersController } from './controller';

const userServersRouter = Router({ mergeParams: true });

userServersRouter.get('/', userServersController.getJoinedServers);

export { userServersRouter };