import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { mutualsService } from './service';

const getMutualFriends: RequestHandler[] = [
  authenticate,
  authorize.user,
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
  authorize.user,
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