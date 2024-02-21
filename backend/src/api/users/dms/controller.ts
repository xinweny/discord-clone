import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { dmService } from '@api/dms/service.js';

const getMyDms: RequestHandler[] = [
  authenticate,
  authorize.userSelf('params'),
  tryCatch(
    async (req, res) => {
      const { userId } = req.params;

      const dms = await dmService.getMany({ userId: userId as string });

      res.json({ data: dms });
    }
  )
];

export const userDmsController = {
  getMyDms,
};