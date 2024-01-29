import { Router } from 'express';

import { dmController } from '@api/dms/controller';

import { messageRouter } from '@api/messages/router';
import { participantRouter } from '@api/dms/participants/router';

const dmRouter = Router();

dmRouter.get('/', dmController.getRooms);

dmRouter.post('/', dmController.createRoom);

dmRouter.use('/:roomId/messages', messageRouter);

dmRouter.use('/:dmId/participants', participantRouter);

dmRouter.get('/:dmId', dmController.getRoom);

dmRouter.put('/:dmId', dmController.updateRoom);

export { dmRouter };