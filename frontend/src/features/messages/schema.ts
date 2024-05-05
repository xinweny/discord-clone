import * as zod from 'zod';

import { fileValidator } from '@utils';

export const sendMessageSchema = zod.object({
  body: zod.string().trim().min(1),
  attachments: fileValidator.attachments,
  next: zod.optional(zod.string().or(zod.null())),
});