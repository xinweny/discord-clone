import { Router } from 'express';

import { serverController } from '.';

import { channelRouter } from './channels';
import { categoryRouter } from './categories';
import { roleRouter } from './roles';
import { customEmojiRouter } from './customEmojis';
import { serverMemberRouter } from './serverMembers';
import { serverOwnerRouter } from './serverOwner';
import { serverInviteRouter } from '@api/serverInvites';

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