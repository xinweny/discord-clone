import { Types } from 'mongoose';
import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';
import { CustomError } from '@helpers/CustomError.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';
import { validateFields } from '@middleware/validateFields.js';

import { messageService } from '@api/messages/service.js';

const getMessage: RequestHandler[] = [
  authenticate,
  authorize.message('view'),
  tryCatch(
    async (req, res) => {
      const message = await messageService.getOne(req.params.messageId);
  
      if (!message) throw new CustomError(400, 'Message not found.');
  
      res.json({ data: message });
    }
  )
];

const getMessages: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {  
      const { query, senderId } = req.query;
      const { serverId, roomId } = req.params;

      const nextId = req.query.next ? req.query.next.toString() : undefined;
      const limit = req.query.limit ? +req.query.limit : 50;

      const { messages, next } = await messageService.getMany(
        {
          ...(roomId && { roomId: new Types.ObjectId(roomId) }),
          ...(senderId && { senderId: new Types.ObjectId(roomId) }),
        },
        { next: nextId, limit },
        !!serverId,
        query ? query.toString() : undefined
      );
  
      res.json({
        data: {
          items: messages,
          next,
        }
      });
    }
  )
];

const createMessage: RequestHandler[] = [
  ...validateFields(['body']),
  authenticate,
  authorize.message('send'),
  tryCatch(
    async (req, res) => {
      const { roomId, serverId } = req.params;
      const { body, attachments } = req.body;

      const userId = req.user?._id;

      const message = await messageService.create(
        {
          senderId: userId,
          roomId,
          body,
        },
        attachments,
        serverId,
      );

      res.json({
        data: message,
        message: 'Message successfully sent.',
      });
    }
  )
];

const updateMessage: RequestHandler[] = [
  ...validateFields(['body']),
  authenticate,
  authorize.messageSelf('update'),
  tryCatch(
    async (req, res) => {
      const message = await messageService.update(req.params.messageId, req.body);

      res.json({
        data: message,
        message: 'Message updated successfully.',
      });
    }
  )
];

const deleteMessage: RequestHandler[] = [
  authenticate,
  authorize.messageSelf('delete'),
  tryCatch(
    async (req, res) => {  
      const message = await messageService.remove(req.params.messageId);
  
      res.json({
        data: message,
        message: 'Message deleted successfully.'
      });
    }
  )
];

export const messageController = {
  getMessage,
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};