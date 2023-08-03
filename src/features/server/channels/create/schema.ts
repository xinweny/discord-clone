import * as zod from 'zod';

export const CreateChannelSchema = zod.object({
  type: zod
    .literal('text')
    .or(zod.literal('voice')),
});