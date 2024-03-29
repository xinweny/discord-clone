import { Router } from 'express';

import { uploadController } from './controller.js';

const uploadRouter = Router();

uploadRouter.post('/avatars/servers/:serverId', uploadController.signServerAvatarUpload);

uploadRouter.post('/avatars/users/:userId', uploadController.signUserAvatarUpload);

uploadRouter.post('/avatars/dms/:dmId', uploadController.signDmAvatarUpload);

uploadRouter.post('/banners/servers/:serverId', uploadController.signServerBannerUpload);

uploadRouter.post('/attachments/:messageId', uploadController.signAttachmentsUpload);

uploadRouter.post('/emojis/:emojiId', uploadController.signEmojiUpload);

export { uploadRouter };