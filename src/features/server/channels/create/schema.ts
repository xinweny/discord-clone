import * as zod from 'zod';

export const createChannelSchema = zod.object({
  type: zod
    .literal('text')
    .or(zod.literal('voice')),
  name: zod.string().min(1),
  serverId: zod.string(),
  private: zod.boolean(),
  categoryId: zod.optional(zod.string()),
});