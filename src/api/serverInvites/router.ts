import { Router } from 'express';

import { serverInviteController } from './controller';

const serverInviteRouter = Router({ mergeParams: true });

serverInviteRouter.get('/', serverInviteController.getInvite);

serverInviteRouter.post('/', serverInviteController.createInvite);

serverInviteRouter.put('/', serverInviteController.updateInviteUrlId);

export { serverInviteRouter };