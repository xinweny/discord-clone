import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { dmService } from '@api/dms/service';

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

const getRooms: RequestHandler[] = [
  authenticate,
  authorize.userSelf('query'),
  tryCatch(
    async (req, res) => {
      const { userId } = req.query;

      const dms = await dmService.getMany({ userId: userId as string });

      res.json({ data: dms });
    }
  )
]

const createRoom: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { participantIds } = req.body;

      participantIds.unshift(req.user?._id);

      const dm = await dmService.create(participantIds);

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
  getRooms,
  createRoom,
  updateRoom,
};