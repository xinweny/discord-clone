import { Router } from 'express';

import { statusController } from './controller';

const statusRouter = Router({ mergeParams: true });

statusRouter.get('/users/', statusController.getUserStatuses);

statusRouter.get('/users/:userId', statusController.getUserStatus);

export { statusRouter };