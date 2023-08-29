import { Router } from 'express';

import { reactionCountController } from './controller';

const reactionCountRouter = Router({ mergeParams: true });

reactionCountRouter.get('/', reactionCountController.getReactionCounts);

export { reactionCountRouter };