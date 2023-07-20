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

export const uploadController = {
  signServerAvatarUpload,
};