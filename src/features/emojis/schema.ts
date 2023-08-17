import * as zod from 'zod';

import { fileValidator } from '@utils';

export const createEmojiSchema = zod.object({
  serverId: zod.string(),
  name: zod.string()
    .min(2).refine((name) => /^[a-zA-Z0-9]+$/i.test(name)),
  file: fileValidator.emoji,
});