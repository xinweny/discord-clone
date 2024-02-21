import { Router } from 'express';

import { webRtcController } from './controller.js';

const webRtcRouter = Router();

webRtcRouter.get('/:roomId/token', webRtcController.generateLivekitToken);

webRtcRouter.get('/:roomId/participants', webRtcController.getParticipants);

webRtcRouter.post('/webhook', webRtcController.livekitWebhook);

export { webRtcRouter };