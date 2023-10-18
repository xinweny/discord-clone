import { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate';
import { tryCatch } from '@helpers/tryCatch';

import { readStatusService } from './service';

const getReadStatuses: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const readStatuses = await readStatusService.getMany(req.user!.id);

      res.json({ data: readStatuses });
    }
  )
];

export const readStatusController = {
  getReadStatuses,
};