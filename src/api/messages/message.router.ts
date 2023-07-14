import { Router } from 'express';

import { reactionRouter } from './reactions';

import { messageController } from '.';

const messageRouter = Router({ mergeParams: true });

messageRouter.get('/', messageController.getMessages);

messageRouter.post('/', messageController.createMessage);

messageRouter.use('/:messageId/reactions', reactionRouter);

messageRouter.get('/:messageId', messageController.getMessage);

messageRouter.put('/:messageId', messageController.updateMessage);

messageRouter.delete('/:messageId', messageController.deleteMessage);

export { messageRouter };