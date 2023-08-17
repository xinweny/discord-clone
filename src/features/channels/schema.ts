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

export const editChannelSchema = zod.object({
  name: zod.string().min(1).max(100),
  description: zod.string().max(1024),
  serverId: zod.string(),
  channelId: zod.string(),
  categoryId: zod.optional(zod.string()),
});