import { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate.js';
import { tryCatch } from '@helpers/tryCatch.js';

import { reactionService } from './service.js';

const getReactions: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const reactions = await reactionService.getByMessage(req.params.messageId);

      res.json({ data: reactions });
    }
  )
];

const createReaction: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { messageId } = req.params;
      const emoji = req.body;

      const reaction = await reactionService.create(
        messageId,
        req.user?._id,
        emoji,
      );

      res.json({ data: reaction });
    }
  )
];

const react: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const reaction = await reactionService.increment(
        req.params.reactionId,
        req.user?._id
      );

      res.json({ data: reaction });
    }
  )
];

const unreact: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const reaction = await reactionService.decrement(
        req.params.reactionId,
        req.user?._id
      );

      res.json({ data: reaction });
    }
  )
];

export const reactionController = {
  getReactions,
  createReaction,
  react,
  unreact,
};