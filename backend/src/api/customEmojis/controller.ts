import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';
import { validateFields } from '@middleware/validateFields.js';

import { customEmojiService } from './service.js';

const getEmojis: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const emojis = await customEmojiService.getMany(req.query.serverIds as string[], !!req.query.populate);

      res.json({ data: emojis });
    }
  )
];

const createEmoji: RequestHandler[] = [
  ...validateFields(['emojiName']),
  authenticate,
  authorize.server('manageExpressions'),
  tryCatch(
    async (req, res) => {
      const { name, filename, serverId } = req.body;
      const emoji = await customEmojiService.create({
        serverId,
        creatorId: req.user!._id,
        name,
      }, filename);

      res.json({
        data: emoji,
        message: 'Emoji successfully created.',
      });
    }
  )
];

const editEmoji: RequestHandler[] = [
  authenticate,
  authorize.server('manageExpressions'),
  tryCatch(
    async (req, res) => {
      const { emojiId } = req.params;
      const { serverId, name } = req.body;

      const emoji = await customEmojiService.update(serverId, emojiId, { name });

      res.json({
        data: emoji,
        message: 'Emoji successfully edited.',
      });
    }
  )
];

const deleteEmoji: RequestHandler[] = [
  authenticate,
  authorize.server('manageExpressions'),
  tryCatch(
    async (req, res) => {
      const { emojiId } = req.params;
      const { serverId } = req.body;

      const emoji = await customEmojiService.remove(serverId, emojiId);

      res.json({
        data: emoji,
        message: 'Emoji successfully removed from server.',
      });
    }
  )
];

export const customEmojiController = {
  getEmojis,
  createEmoji,
  editEmoji,
  deleteEmoji,
};