import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { userServersService } from './service';

const getJoinedServers: RequestHandler[] = [
  authenticate,
  authorize.userSelf('params'),
  tryCatch(
    async (req, res) => {
      const servers = await userServersService.getJoined(req.params.userId);

      res.json({ data: servers });
    }
  )
]

export const userServersController = {
  getJoinedServers,
};