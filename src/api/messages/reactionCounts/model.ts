import mongoose, { Schema, Types } from 'mongoose';

import env from '@config/env';
export interface IReactionCount extends Document {
  _id: Types.ObjectId;
  name: string;
  count: number;
  type: 'custom' | 'default';
}

export const reactionCountSchema = new Schema({
  messageId: {
    type: Types.ObjectId,
    ref: 'Message',
    required: true,
  },
  name: { type: String, required: true },
  count: { type: Number, default: 1 },
});

export const ReactionCount = mongoose.model<IReactionCount>('ReactionCount', reactionCountSchema, 'reaction_counts');

if (env.NODE_ENV === 'development') {
  reactionCountSchema.index({
    messageId: 1,
    emojiId: 1,
    unified: 1,
  }, { unique: true });
}