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

export const editPasswordSchema = zod.object({
  currentPassword: zod.string().min(1, 'Password is required.'),
  password: zod.string()
    .min(8, 'Password must be a minimum of 8 characters.'),
  confirmPassword: zod.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const editUsernameSchema = zod.object({
  username: zod.string()
    .min(2).max(32),
  password: zod.string(),
});