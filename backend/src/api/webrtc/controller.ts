import { RequestHandler } from 'express';

import { receiver } from '@config/livekit';

import { io } from '@app/server';

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

const livekitWebhook: RequestHandler = tryCatch(
  (req, res) => {
    const event = receiver.receive(req.body, req.get('Authorization'));

    res.status(200).end();

    if (!event.event || !event.room) return null;

    const {
      event: eventName,
      room: { name },
    } = event;

    io.to(name).emit(eventName, event);
  }
);

export const webRtcController = {
  generateLivekitToken,
  getParticipants,
  livekitWebhook,
};