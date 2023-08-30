import { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate';
import { tryCatch } from '@helpers/tryCatch';

import { reactionService } from './service';

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
        req.user!.id,
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
        req.user!.id
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
        req.user!.id
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