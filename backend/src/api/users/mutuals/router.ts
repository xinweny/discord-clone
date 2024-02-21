import { Router } from 'express';

import { mutualsController } from './controller.js';

const mutualsRouter = Router({ mergeParams: true });

mutualsRouter.get('/:userId2/friends', mutualsController.getMutualFriends);

mutualsRouter.get('/:userId2/servers', mutualsController.getMutualServers);

export { mutualsRouter };