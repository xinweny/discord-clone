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

const signAttachmentsUpload: RequestHandler[] = [
  authenticate,
  authorize.message('send'),
  tryCatch(
    async (req, res) => {
      const { messageId } = req.params;
      const filenames: string[] = req.body.filenames;
      const { serverId, roomId } = req.query;

      const dir = `/attachments/${serverId ? `servers/${serverId}/` : 'dms/'}/${roomId}/${messageId}`;

      const signatures = filenames.map(filename =>
        cloudinaryService.createSignature(filename, dir)
      );
  
      res.json({
        data: signatures,
      });
    }
  )
];

export const uploadController = {
  signServerAvatarUpload,
  signAttachmentsUpload,
};