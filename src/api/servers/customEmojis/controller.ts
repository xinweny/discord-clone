import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { CustomError } from '@helpers/CustomError';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';
import { validateFields } from '@middleware/validateFields';
import { upload } from '@middleware/upload';

import { customEmojiService } from './service';

const getEmojis: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const emojis = await customEmojiService.getMany(req.params.serverId);

      res.json({ data: emojis });
    }
  )
];

const createEmoji: RequestHandler[] = [
  upload.emoji,
  ...validateFields(['emojiName']),
  authenticate,
  authorize.server('manageExpressions'),
  tryCatch(
    async (req, res) => {
      if (!req.emoji) throw new CustomError(400, 'File not found.');

      const emoji = await customEmojiService.create(req.params.serverId, req.emoji, {
        creatorId: req.member!._id,
        name: req.body.name,
      });

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
      const { serverId, emojiId } = req.params;
      const { name } = req.body;

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
      const { serverId, emojiId } = req.params;

      await customEmojiService.remove(serverId, emojiId);

      res.json({
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