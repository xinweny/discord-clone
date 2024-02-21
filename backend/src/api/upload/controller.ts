import { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { tryCatch } from '@helpers/tryCatch.js';

import { cloudinaryService } from '@services/cloudinary.js';

const signServerAvatarUpload: RequestHandler[] = [
  authenticate,
  authorize.server('manageServer'),
  tryCatch(
    async (req, res) => {
      const { filename } = req.body;
      const { serverId } = req.params;

      const dir = `servers/${serverId}/avatar`;
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, serverId);
  
      res.json({
        data: { timestamp, signature, folder },
      });
    }
  )
];

const signServerBannerUpload: RequestHandler[] = [
  authenticate,
  authorize.server('manageServer'),
  tryCatch(
    async (req, res) => {
      const { filename } = req.body;
      const { serverId } = req.params;

      const dir = `servers/${serverId}/banner`;
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, serverId);
  
      res.json({
        data: { timestamp, signature, folder },
      });
    }
  )
];

const signUserAvatarUpload: RequestHandler[] = [
  authenticate,
  authorize.userSelf('params'),
  tryCatch(
    async (req, res) => {
      const { filename } = req.body;
      const { userId } = req.params;

      const dir = `users/${userId}/avatar`;
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, userId);
  
      res.json({
        data: { timestamp, signature, folder },
      });
    }
  )
];

const signDmAvatarUpload: RequestHandler[] = [
  authenticate,
  authorize.dmMember,
  tryCatch(
    async (req, res) => {
      const { filename } = req.body;
      const { dmId } = req.params;

      const dir = `dms/${dmId}/avatar`;
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, dmId);
  
      res.json({
        data: { timestamp, signature, folder },
      });
    }
  )
];

const signAttachmentsUpload: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { messageId } = req.params;
      const filenames: string[] = req.body.filenames;
      const { serverId, roomId } = req.query;

      const dir = `${serverId
        ? `servers/${serverId}/channels`
        : `dms`
      }/${roomId}/messages/${messageId}/attachments`;

      const signatures = filenames.map(filename =>
        cloudinaryService.createSignature(filename, dir)
      );
  
      res.json({
        data: signatures,
      });
    }
  )
];

const signEmojiUpload: RequestHandler[] = [
  authenticate,
  authorize.server('manageExpressions'),
  tryCatch(
    async (req, res) => {
      const { emojiId } = req.params;
      const { serverId } = req.query;
      const { filename } = req.body;

      const dir = `servers/${serverId}/emojis`;
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, emojiId);
  
      res.json({
        data: { timestamp, signature, folder },
      });
    }
  )
];

export const uploadController = {
  signServerAvatarUpload,
  signServerBannerUpload,
  signUserAvatarUpload,
  signDmAvatarUpload,
  signAttachmentsUpload,
  signEmojiUpload,
};