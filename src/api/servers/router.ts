import { Router } from 'express';

import { serverController } from './controller';

import { channelRouter } from './channels/router';
import { categoryRouter } from './categories/router';
import { roleRouter } from './roles/router';
import { customEmojiRouter } from './customEmojis/router';
import { serverMemberRouter } from '../serverMembers/router';
import { serverOwnerRouter } from './serverOwner/router';
import { serverInviteRouter } from '@api/serverInvites/router';

const serverRouter = Router();

serverRouter.get('/', serverController.getPublicServers);

serverRouter.post('/', serverController.createServer);

serverRouter.use('/:serverId/channels', channelRouter);

serverRouter.use('/:serverId/categories', categoryRouter);

serverRouter.use('/:serverId/members', serverMemberRouter);

serverRouter.use('/:serverId/roles', roleRouter);

serverRouter.use('/:serverId/emojis', customEmojiRouter);

serverRouter.use('/:serverId/owner', serverOwnerRouter);

serverRouter.use('/:serverId/invite', serverInviteRouter);

serverRouter.get('/:serverId', serverController.getServer);

serverRouter.put('/:serverId', serverController.updateServer);

serverRouter.delete('/:serverId', serverController.deleteServer);

export { serverRouter };