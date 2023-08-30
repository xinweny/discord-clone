import { Types } from 'mongoose';

import { ReactionCount } from './model';
import { CustomEmojiCount, EmojiCount } from './discriminators';

type CreateCountFields = {
  name: string;
} & ({
  custom: true;
  emojiId: string | Types.ObjectId;
  url: string;
} | {
  custom: false;
  unified: string;
  native: string;
});

const getCounts = async (messageId: string | Types.ObjectId) => {
  const reactionCounts = await ReactionCount.find({ messageId: new Types.ObjectId(messageId) });

  return reactionCounts;
};

const createCount = async (
  messageId: string | Types.ObjectId,
  options: CreateCountFields
) => {
  const { custom, name } = options;

  const reactionCount = custom
    ? new CustomEmojiCount({
      messageId,
      name,
      emojiId: options.emojiId,
      url: options.url,
    })
    : new EmojiCount({
      messageId,
      name,
      unified: options.unified,
      native: options.native,
    });

  await reactionCount.save();

  return reactionCount;
};

const increment = async (countId: string | Types.ObjectId) => {
  const reactionCount = await ReactionCount.findOneAndUpdate({
    _id: new Types.ObjectId(countId),
  }, {
    $inc: { count: 1 },
  }, { new: true });

  return reactionCount;
};

const decrement = async (countId: string | Types.ObjectId) => {
  const reactionCount = await ReactionCount.updateOne({
    _id: new Types.ObjectId(countId),
  }, {
    $inc: { count: -1 },
  }, { new: true });

  await ReactionCount.findOneAndRemove({
    _id: new Types.ObjectId(countId),
    count: 0,
  });

  return reactionCount;
};

export const reactionCountService = {
  getCounts,
  createCount,
  increment,
  decrement,
};

