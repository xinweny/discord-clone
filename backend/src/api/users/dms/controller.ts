import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { dmService } from '@api/dms/service';

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