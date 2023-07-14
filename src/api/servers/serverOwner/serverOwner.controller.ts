import { RequestHandler } from 'express';

import { tryCatch } from '@helpers';

import {
  authenticate, 
  authorize,
} from '@middleware';

import { serverOwnerService } from '.';

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