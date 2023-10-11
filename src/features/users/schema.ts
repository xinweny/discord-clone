import * as zod from 'zod';

import { fileValidator } from '@utils';

export const userProfileSchema = zod.object({
  displayName: zod.string().min(2),
  bannerColor: zod.string()
    .optional()
    .or(zod.literal('')),
  bio: zod.string()
    .min(2).max(190).optional()
    .or(zod.literal('')),
  file: fileValidator.avatar,
});