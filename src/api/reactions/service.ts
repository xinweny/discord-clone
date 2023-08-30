import { Types } from 'mongoose';

import { Reaction } from './model';
import { CustomEmojiReaction, EmojiReaction } from './discriminators';

type CreateReactionFields = {
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

const getByMessage = async (
  messageId: string | Types.ObjectId,
  userId: string | Types.ObjectId
) => {
  const reactions = await Reaction.aggregate([
    {
      $match: { messageId: new Types.ObjectId(messageId) },
    },
    {
      $addFields: {
        userHasReacted: {
          $in: [new Types.ObjectId(userId), '$userIds'],
        },
      },
    },
    { $unset: 'userIds' },
  ]);

  return reactions;
};

const create = async (
  messageId: string | Types.ObjectId,
  userId: string | Types.ObjectId,
  options: CreateReactionFields
) => {
  const { custom, name } = options;

  const reactionCount = custom
    ? new CustomEmojiReaction({
      messageId,
      name,
      userIds: [userId],
      emojiId: options.emojiId,
      url: options.url,
    })
    : new EmojiReaction({
      messageId,
      name,
      userIds: [userId],
      unified: options.unified,
      native: options.native,
    });

  await reactionCount.save();

  return reactionCount;
};

const increment = async (
  reactionId: string | Types.ObjectId,
  userId: string | Types.ObjectId
) => {
  const reactionCount = await Reaction.findOneAndUpdate({
    _id: new Types.ObjectId(reactionId),
    userIds: { '$ne': userId },
  }, {
    $addToSet: { userIds: new Types.ObjectId(userId) },
    $inc: { count: 1 },
  }, { new: true });

  return reactionCount;
};

const decrement = async (
  reactionId: string | Types.ObjectId,
  userId: string | Types.ObjectId
) => {
  const reactionCount = await Reaction.updateOne({
    _id: new Types.ObjectId(reactionId),
    userIds: userId,
  }, {
    $pull: { userIds: new Types.ObjectId(userId) },
    $inc: { count: -1 },
  }, { new: true });

  await Reaction.findOneAndRemove({
    _id: new Types.ObjectId(reactionId),
    count: 0,
  });

  return reactionCount;
};

export const reactionService = {
  getByMessage,
  create,
  increment,
  decrement,
};

