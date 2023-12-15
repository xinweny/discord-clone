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

export const changePasswordSchema = zod.object({
  oldPassword: zod.string(),
  newPassword: zod.string()
    .min(8, 'Password must be a minimum of 8 characters.'),
  confirmPassword: zod.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});