import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { serverOwnerService } from './service.js';

const changeServerOwnership: RequestHandler[] = [
  authenticate,
  authorize.serverOwner,
  tryCatch(
    async (req, res) => {
      const data = await serverOwnerService.update(req.params.serverId, req.body.memberId);

      res.json({
        data,
        message: 'Server ownership changed successfully.',
      });
    }
  )
];

export const serverOwnerController = {
  changeServerOwnership,
};