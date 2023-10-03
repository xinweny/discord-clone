import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';

import { statusService } from './service';

const getUserStatus: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { userId } = req.params;
      
      const status = await statusService.getStatus(userId);

      res.json({ data: status });
    }
  )
];

export const userStatusController = {
  getUserStatus,
};