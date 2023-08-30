import { Router } from 'express';

import { messageController } from './controller';

import { reactionRouter } from '../reactions/router';

const messageRouter = Router({ mergeParams: true });

messageRouter.get('/', messageController.getMessages);

messageRouter.post('/', messageController.createMessage);

messageRouter.use('/:messageId/reactions', reactionRouter);

messageRouter.get('/:messageId', messageController.getMessage);

messageRouter.put('/:messageId', messageController.updateMessage);

messageRouter.delete('/:messageId', messageController.deleteMessage);

export { messageRouter };