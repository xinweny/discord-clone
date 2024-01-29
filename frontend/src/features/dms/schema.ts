import zod from 'zod';

import { fileValidator } from '@utils';

export const createDmSchema = zod.object({
  participantIds: zod.string().array()
    .refine(ids => ids.length > 0, 'You can add 9 more friends.')
    .refine(ids => ids.length <= 9, 'This group has a limit of 10 members.'),
});

export const editGroupNameSchema = zod.object({
  dmId: zod.string(),
  name: zod.string()
    .min(1).max(100),
});

export const editGroupAvatarSchema = zod.object({
  dmId: zod.string(),
  avatar: fileValidator.avatar,
});