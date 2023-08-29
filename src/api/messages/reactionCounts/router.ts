import { Router } from 'express';

import { reactionController } from './controller';

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get('/counts', reactionController.getReactionCounts);