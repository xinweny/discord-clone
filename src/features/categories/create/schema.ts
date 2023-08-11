import * as zod from 'zod';

export const createCategorySchema = zod.object({
  name: zod.string().min(1),
  serverId: zod.string(),
});