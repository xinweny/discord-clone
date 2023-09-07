import zod from 'zod';

export const createDmSchema = zod.object({
  participantIds: zod.string().array()
    .refine(ids => ids.length > 0, 'You must add at least 1 friend.')
    .refine(ids => ids.length <= 9, 'This group has a limit of 10 members.'),
});