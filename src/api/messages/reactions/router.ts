import { Router } from 'express';

import { reactionCountRouter } from '../reactionCounts/router';

import { reactionController } from './controller';

const reactionRouter = Router({ mergeParams: true });

reactionRouter.use('/counts', reactionCountRouter);

reactionRouter.post('/', reactionController.reactToMessage);

// reactionRouter.delete('/:reactionId', reactionController.unreactToMessage);

export { reactionRouter };