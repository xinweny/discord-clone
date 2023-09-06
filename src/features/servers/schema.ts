import * as zod from 'zod';

import { fileValidator } from '@utils';

export const createServerSchema = zod.object({
  name: zod.string().min(1),
  file: fileValidator.avatar,
});

export const editServerSchema = zod.object({
  serverId: zod.string(),
  name: zod.string().min(1),
  description: zod.literal('')
    .or(zod.string().min(1).max(120)),
  avatar: fileValidator.avatar,
  banner: fileValidator.banner,
});