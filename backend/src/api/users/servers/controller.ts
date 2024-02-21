import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { userServersService } from './service.js';

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