import * as zod from 'zod';

export const editChannelSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string().max(1024),
  serverId: zod.string(),
  categoryId: zod.optional(zod.string()),
});