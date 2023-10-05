import { Router } from 'express';

import { webRtcController } from './controller';

const webRtcRouter = Router();

webRtcRouter.get('/:roomId/token', webRtcController.generateLivekitToken);

webRtcRouter.get('/:roomId/participants', webRtcController.getParticipants);

export { webRtcRouter };