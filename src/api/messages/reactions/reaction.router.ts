import { Router } from 'express';

import { reactionController } from '.';

const reactionRouter = Router({ mergeParams: true });

reactionRouter.post('/', reactionController.reactToMessage);

reactionRouter.delete('/:reactionId', reactionController.unreactToMessage);

export { reactionRouter };