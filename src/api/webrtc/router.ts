import { Router } from 'express';

import { webRtcController } from './controller';

const webRtcRouter = Router();

webRtcRouter.post('/token', webRtcController.generateLivekitToken);

export { webRtcRouter };