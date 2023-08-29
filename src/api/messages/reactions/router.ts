import { Router } from 'express';

import { reactionController } from './controller';

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get('/counts', reactionController.getReactionCounts);

reactionRouter.post('/', reactionController.reactToMessage);

// reactionRouter.delete('/:reactionId', reactionController.unreactToMessage);

export { reactionRouter };