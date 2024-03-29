import mongoose, { Schema, Types } from 'mongoose';
export interface IReaction extends Document {
  _id: Types.ObjectId;
  name: string;
  type: 'custom' | 'emoji';
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

reactionSchema.index({
  messageId: 1,
  emojiId: 1,
  unified: 1,
}, { unique: true });
