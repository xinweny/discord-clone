import { RequestHandler } from 'express';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { tryCatch } from '@helpers/tryCatch';

import { cloudinaryService } from '@services/cloudinary';

const signServerAvatarUpload: RequestHandler[] = [
  authenticate,
  authorize.server('manageServer'),
  tryCatch(
    async (req, res) => {
      const { filename } = req.body;
      const dir = 'avatars/servers';
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, req.params.serverId);
  
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
      const dir = 'banners/servers';
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, req.params.serverId);
  
      res.json({
        data: { timestamp, signature, folder },
      });
    }
  )
];

const signUserAvatarUpload: RequestHandler[] = [
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const { filename } = req.body;
      const dir = 'avatars/users';
  
      const { timestamp, signature, folder } = cloudinaryService.createSignature(filename, dir, req.params.userId);
  
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

      const dir = `attachments/${serverId ? `servers/${serverId}/` : 'dms/'}/${roomId}/${messageId}`;

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
  tryCatch(
    async (req, res) => {
      const { emojiId } = req.params;
      const { serverId } = req.query;
      const { filename } = req.body;

      const dir = `emojis/${serverId}`;
  
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
  signAttachmentsUpload,
  signEmojiUpload,
};