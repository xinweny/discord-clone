import * as zod from 'zod';

export const sendFriendRequestSchema = zod.object({
  senderId: zod.string(),
  username: zod.string(),
});