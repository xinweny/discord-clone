import { Router } from 'express';

import { reactionController } from './controller.js';

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get('/', reactionController.getReactions);

reactionRouter.post('/', reactionController.createReaction);

reactionRouter.put('/:reactionId', reactionController.react);

reactionRouter.delete('/:reactionId', reactionController.unreact);

export { reactionRouter };