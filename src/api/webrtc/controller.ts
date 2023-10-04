import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { authenticate } from '@middleware/authenticate';

import { webRtcService } from './service';

const generateLivekitToken: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const userId = req.user!.id;
      const { roomId } = req.params;

      const token = webRtcService.createLivekitToken(roomId, userId);

      res.json({ data: token });
    }
  ),
]

export const webRtcController = {
  generateLivekitToken,
};