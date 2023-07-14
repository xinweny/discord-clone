import { Router } from 'express';

import { dmController } from '@api/dms';

import { messageRouter } from '@api/messages';
import { participantRouter } from '@api/dms/participants';

const dmRouter = Router();

dmRouter.post('/', dmController.createRoom);

dmRouter.use('/:roomId/messages', messageRouter);

dmRouter.use('/:dmId/participants', participantRouter);

dmRouter.get('/:dmId', dmController.getRoom);

dmRouter.put('/:dmId', dmController.updateRoom);

export { dmRouter };