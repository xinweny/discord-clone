import mongoose, { Schema, Types } from 'mongoose';

import env from '@config/env';
export interface IReaction extends Document {
  _id: Types.ObjectId;
  name: string;
  type: 'custom' | 'default';
  userIds: Types.ObjectId[];
  count: number;
}

export const reactionSchema = new Schema({
  messageId: {
    type: Types.ObjectId,
    ref: 'Message',
    required: true,
  },
  name: { type: String, required: true },
  userIds: { type: [Types.ObjectId], ref: 'User', required: true },
  count: { type: Number, default: 1 },
});

export const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema);

if (env.NODE_ENV === 'development') {
  reactionSchema.index({
    messageId: 1,
    emojiId: 1,
    unified: 1,
  }, { unique: true });
}