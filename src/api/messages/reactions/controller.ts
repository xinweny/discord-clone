import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { CustomError } from '@helpers/CustomError';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { reactionCountService } from '../reactionCounts/service';

const reactToMessage: RequestHandler[] = [
  authenticate,
  authorize.message('react'),
  tryCatch(
    async (req, res) => {
      const { messageId } = req.params;
    }
  )
];

const unreactToMessage: RequestHandler[] = [
  authenticate,
  authorize.message('view'),
  authorize.unreact,
  tryCatch(
    async (req, res) => {
      const { messageId, reactionId } = req.params;
      const { reaction } = req;

      const [message] = await Promise.all([
        messageService.unreact(messageId, reaction!),
        reactionService.remove(reactionId),
      ]);

      if (!message) throw new CustomError(400, 'Message not found.');

      res.json({
        data: reaction,
        message: 'Message unreacted successfully.',
      })
    }
  )
];

export const reactionController = {
  reactToMessage,
  // unreactToMessage,
};