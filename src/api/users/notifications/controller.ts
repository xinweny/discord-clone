import { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate';
import { tryCatch } from '@helpers/tryCatch';

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
      const unreadCounts = await messageService.getUnreadCounts(req.user!.id);

      res.json({ data: unreadCounts });
    }
  )
]

export const notificationController = {
  getReadStatuses,
  getUnreadMessageCounts,
};