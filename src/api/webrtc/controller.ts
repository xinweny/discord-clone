import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { webRtcService } from './service';

const generateLivekitToken: RequestHandler[] = [
  authenticate,
  authorize.rtc,
  tryCatch(
    async (req, res) => {
      const userId = req.user!.id;
      const { roomId } = req.params;

      const token = webRtcService.createLivekitToken(roomId, userId);

      res.json({ data: token });
    }
  ),
];

const getParticipants: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const participants = await webRtcService.getParticipants(req.params.roomId);

      res.json({ data: participants });
    }
  )
];

export const webRtcController = {
  generateLivekitToken,
  getParticipants,
};