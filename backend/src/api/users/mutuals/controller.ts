import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { mutualsService } from './service.js';

const getMutualFriends: RequestHandler[] = [
  authenticate,
  authorize.userSelf('params'),
  tryCatch(
    async (req, res) => {
      const userId1 = req.params.userId;
      const { userId2 } = req.params;

      const friends = await mutualsService.getFriends(userId1, userId2);

      res.json({ data: friends });
    }
  )
];

const getMutualServers: RequestHandler[] = [
  authenticate,
  authorize.userSelf('params'),
  tryCatch(
    async (req, res) => {
      const userId1 = req.params.userId;
      const { userId2 } = req.params;

      const servers = await mutualsService.getServers(userId1, userId2);

      res.json({ data: servers });
    }
  )
];

export const mutualsController = {
  getMutualFriends,
  getMutualServers,
};