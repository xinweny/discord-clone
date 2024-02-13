import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';
import { validateFields } from '@middleware/validateFields';

import { customEmojiService } from './service';

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
      const { name, filename } = req.body;

      const emoji = await customEmojiService.create(req.params.serverId, {
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
      const { name } = req.body;

      const emoji = await customEmojiService.update(emojiId, { name });

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

      const emoji = await customEmojiService.remove(emojiId);

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