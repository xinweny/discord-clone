import { Router } from 'express';

import { notificationController } from './controller';

const notificationRouter = Router({ mergeParams: true });

notificationRouter.get('/read', notificationController.getReadStatuses);

notificationRouter.get('/unread', notificationController.getUnreadMessageCounts);

export { notificationRouter };