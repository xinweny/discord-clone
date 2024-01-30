import { RequestHandler } from 'express';

import { CustomError } from '@helpers/CustomError';
import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';

import { notificationService } from './service';
import { messageService } from '@api/messages/service';

const getReadStatuses: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const readStatuses = await notificationService.getReadStatuses(req.user!.id);

      res.json({ data: readStatuses });
    }
  )
];

const getUnreadMessageCounts: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { type } = req.query;

      if (!(type === 'dm' || type === 'channel')) throw new CustomError(400, 'Invalid type.');

      const unreadCounts = await messageService.getUnreadTimestamps(req.user!.id, type);

      res.json({ data: unreadCounts });
    }
  )
]

export const notificationController = {
  getReadStatuses,
  getUnreadMessageCounts,
};