import { ReactionCount } from '../model';

type CountUpdateFields = {
  messageId: string;
  countId: string;
};

const increment = async (options: CountUpdateFields) => {
  const { messageId, countId } = options;

  const reactionCount = await ReactionCount.findOneAndUpdate({
    messageId,
    'counts._id': countId,
  }, {
    'counts.$.count': { $inc: 1 }, 
  }, { new: true });

  return reactionCount?.counts.filter(count => count._id.equals(countId));
};

const decrement = async (options: CountUpdateFields) => {
  const { messageId, countId } = options;

  const reactionCount = await ReactionCount.findOneAndUpdate({
    messageId,
    'counts._id': countId,
  }, {
    'counts.$.count': { $inc: -1 }, 
  }, { new: true });

  return 
};

export const countService = {
  increment,
  decrement,
};