import { Router } from 'express';

import { uploadController } from './controller';

const uploadRouter = Router();

uploadRouter.post('/avatars/servers/:serverId', uploadController.signServerAvatarUpload);

export { uploadRouter };