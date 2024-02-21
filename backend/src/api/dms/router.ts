import { Router } from 'express';

import { dmController } from '@api/dms/controller.js';

import { messageRouter } from '@api/messages/router.js';
import { participantRouter } from '@api/dms/participants/router.js';

const dmRouter = Router();

dmRouter.post('/', dmController.createRoom);

dmRouter.use('/:roomId/messages', messageRouter);

dmRouter.use('/:dmId/participants', participantRouter);

dmRouter.get('/:dmId', dmController.getRoom);

dmRouter.put('/:dmId', dmController.updateRoom);

export { dmRouter };