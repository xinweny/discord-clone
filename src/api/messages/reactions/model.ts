import mongoose, { Schema, Types } from 'mongoose';

import env from '@config/env';

export type IReaction = {
  _id: Types.ObjectId;
  reactorId: Types.ObjectId;
  countId: Types.ObjectId;
};

const reactionSchema = new Schema({
  reactorId: { type: Schema.Types.ObjectId, required: true },
  countId: { type: Schema.Types.ObjectId, ref: 'ReactionCount', required: true },
});

export const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema);

if (env.NODE_ENV === 'development') {
  reactionSchema.index({
    reactorId: 1,
    countId: 1,
  }, { unique: true });
}