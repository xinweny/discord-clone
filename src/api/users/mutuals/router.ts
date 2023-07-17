import { Router } from 'express';

import { mutualsController } from './controller';

const mutualsRouter = Router({ mergeParams: true });

mutualsRouter.get('/:userId2/friends', mutualsController.getMutualFriends);

mutualsRouter.get('/:userId2/servers', mutualsController.getMutualFriends);

export { mutualsRouter };