import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { dmService } from '@api/dms/service.js';

const getRoom: RequestHandler[] = [
  authenticate,
  authorize.dmMember,
  tryCatch(
    async (req, res) => {
      const { dmId } = req.params;

      const dm = await dmService.getById(dmId);

      res.json({ data: dm });
    }
  )
];

const createRoom: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { participantIds } = req.body;

      const dm = await dmService.create([req.user!.id, ...participantIds]);

      res.json({
        data: dm,
        message: 'Direct message chat successfully created.',
      });
    }
  )
];

const updateRoom: RequestHandler[] = [
  authenticate,
  authorize.dmMember,
  tryCatch(
    async (req, res) => {
      const { dmId } = req.params;

      const dm = await dmService.update(dmId, req.body, req.body.filename);

      res.json({
        data: dm,
        message: 'DM successfully updated.',
      });
    }
  )
];

export const dmController = {
  getRoom,
  createRoom,
  updateRoom,
};