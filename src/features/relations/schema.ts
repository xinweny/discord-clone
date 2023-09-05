import * as zod from 'zod';

export const sendFriendRequestSchema = zod.object({
  userId: zod.string(),
  username: zod.string().min(1),
});