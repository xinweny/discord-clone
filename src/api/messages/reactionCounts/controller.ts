import { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate';
import { tryCatch } from '@helpers/tryCatch';

import { reactionCountService } from './service';

const getReactionCounts: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const counts = await reactionCountService.getCounts(req.params.messageId);

      res.json({ data: counts });
    }
  )
];

export const reactionCountController = {
  getReactionCounts,
};