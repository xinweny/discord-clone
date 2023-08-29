import type { Types } from 'mongoose';

import { ReactionCount } from './model';

const getCounts = async (messageId: string | Types.ObjectId) => {
  const reactionCount = await ReactionCount.findOne({ messageId });

  return reactionCount ? reactionCount.counts : [];
};

export const reactionCountService = {
  getCounts,
};