import { Router } from 'express';

import { channelController } from './controller';

import { messageRouter } from '@api/messages/router';

const channelRouter = Router({ mergeParams: true });

channelRouter.get('/', channelController.getChannels);

channelRouter.post('/', channelController.createChannel);

channelRouter.use('/:roomId/messages', messageRouter);

channelRouter.get('/:channelId', channelController.getChannel);

channelRouter.put('/:channelId', channelController.updateChannel);

channelRouter.delete('/:channelId', channelController.deleteChannel);

export { channelRouter };