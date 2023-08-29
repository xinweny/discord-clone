import type { Types } from 'mongoose';

const getCounts = async (messageId: string | Types.ObjectId) => {
  return 'hi';
};

export const reactionCountService = {
  getCounts,
};