import mongoose, { Schema, Types } from 'mongoose';

import { countSchema } from './counts/schema';
import { IDefaultCount, ICustomCount } from './counts/discriminators';
export interface IReactionCount extends Document {
  _id: Types.ObjectId;
  messageId: Types.ObjectId;
  counts: Types.DocumentArray<IDefaultCount | ICustomCount>;
}

const reactionCountSchema = new Schema({
  messageId: {
    type: Types.ObjectId,
    ref: 'Message',
    required: true,
    unique: true,
  },
  counts: { type: [countSchema], default: [] },
});

export const ReactionCount = mongoose.model<IReactionCount>('ReactionCount', reactionCountSchema, 'reaction_counts');