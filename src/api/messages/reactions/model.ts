import mongoose, { Schema, Types } from 'mongoose';

export type IReaction = {
  _id: Types.ObjectId;
  reactorId: Types.ObjectId;
  messageId: Types.ObjectId;
  name: string;
} & (
  {
    emojiId: Types.ObjectId;
  } |
  { unified: string }
);

const reactionSchema = new Schema({
  reactorId: { type: Schema.Types.ObjectId, required: true },
  messageId: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  emojiId: { type: Schema.Types.ObjectId, ref: 'CustomEmoji' },
  unified: { type: String },
});

export const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema);