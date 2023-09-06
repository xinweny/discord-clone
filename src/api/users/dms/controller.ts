import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { userDmsService } from './service';

const getMyDms: RequestHandler[] = [
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const dms = await userDmsService.getDms(req.params.userId);

      res.json({ data: dms });
    }
  )
]

export const userDmsController = {
  getMyDms,
};