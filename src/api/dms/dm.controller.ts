import { RequestHandler } from 'express';

import { tryCatch } from '@helpers';

import {
  authenticate, 
  authorize,
  upload,
} from '@middleware';

import { dmService } from '@api/dms';

const getRoom: RequestHandler[] = [
  authenticate,
  authorize.dmMember,
  tryCatch(
    async (req, res) => {
      res.json({ data: req.dm });
    }
  )
];

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
  upload.avatar,
  authenticate,
  authorize.dmMember,
  tryCatch(
    async (req, res) => {
      const { dmId } = req.params;

      const dm = await dmService.update(dmId, req.body, req.file);

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