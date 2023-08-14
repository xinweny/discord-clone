import * as zod from 'zod';

export const editCategorySchema = zod.object({
  name: zod.string().min(1),
  serverId: zod.string(),
  categoryId: zod.string(),
});