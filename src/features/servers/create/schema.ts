import * as zod from 'zod';

import { fileValidator } from '@utils';

export const serverSchema = zod.object({
  name: zod.string().min(1),
  file: fileValidator.avatar,
});