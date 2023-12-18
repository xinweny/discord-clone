import * as zod from 'zod';

import { checkUsernameAvailability } from './utils';

export const registerSchema = zod.object({
  email: zod.string(),
  displayName: zod.string()
    .or(zod.literal('')),
  username: zod.string()
    .min(2, 'This must be 2-32 characters.')
    .max(32, 'This must be 2-32 characters.')
    .refine((username) => /^[a-zA-Z0-9_.]+$/.test(username), 'Please only use numbers, letters, underscores _ or periods.')
    .refine(checkUsernameAvailability, 'Username is unavailable. Try adding numbers, letters, underscores_ or full stops.'),
  password: zod.string()
    .min(8, 'Password must be a minimum of 8 characters.'),
  confirmPassword: zod.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});