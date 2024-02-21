import { Router } from 'express';

import { serverController } from './controller.js';

import { channelRouter } from './channels/router.js';
import { categoryRouter } from './categories/router.js';
import { roleRouter } from './roles/router.js';
import { serverMemberRouter } from '../serverMembers/router.js';
import { serverOwnerRouter } from './serverOwner/router.js';

const serverRouter = Router();

serverRouter.get('/', serverController.getPublicServers);

serverRouter.post('/', serverController.createServer);

serverRouter.use('/:serverId/channels', channelRouter);

serverRouter.use('/:serverId/categories', categoryRouter);

serverRouter.use('/:serverId/members', serverMemberRouter);

serverRouter.use('/:serverId/roles', roleRouter);

serverRouter.use('/:serverId/owner', serverOwnerRouter);

serverRouter.get('/:serverId', serverController.getServer);

serverRouter.put('/:serverId', serverController.updateServer);

serverRouter.delete('/:serverId', serverController.deleteServer);

export { serverRouter };