import * as zod from 'zod';

import { fileValidator } from '@utils';

export const messageSchema = zod.object({
  body: zod.string().trim().min(1),
  attachments: fileValidator.attachments,
});