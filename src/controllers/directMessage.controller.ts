import { RequestHandler } from 'express';

import authenticate from '../middleware/authenticate';
import tryCatch from '../middleware/tryCatch';

import DirectMessageService from '../services/directMessage.service';

const createRoom: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res, next) => {
      const directMessage = await DirectMessageService.create({
        creatorId: req.user!._id,
        ...req.body,
      });

      res.json({
        data: directMessage,
        message: 'Direct message chat successfully created.',
      });
    }
  )
];

export default {
  createRoom,
}