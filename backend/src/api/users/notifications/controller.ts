import { RequestHandler } from 'express';

import { CustomError } from '@helpers/CustomError.js';
import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';

import { notificationService } from './service.js';
import { messageService } from '@api/messages/service.js';

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