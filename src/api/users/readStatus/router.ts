import { Router } from 'express';

import { readStatusController } from './controller';

const readStatusRouter = Router({ mergeParams: true });

readStatusRouter.get('/', readStatusController.getReadStatuses);

export { readStatusRouter };