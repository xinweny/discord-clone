import * as zod from 'zod';

import { fileValidator } from '@utils';
import { checkUsernameAvailability } from '@features/auth/utils';

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
  currentPassword: zod.string().min(1, 'Password is required.'),
  username: zod.string()
    .min(2).max(32)
    .refine((value) => /^[a-z0-9._]+$/.test(value), 'Please only use numbers, letters, underscores _ or periods.')
    .refine(checkUsernameAvailability, 'Username is unavailable. Try adding numbers, letters, underscores_ or full stops.'),
});

export const editCustomStatusSchema = zod.object({
  customStatus: zod.string().max(128),
});