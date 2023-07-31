import { Schema, Types } from 'mongoose';

export interface IReactionCount extends Types.Subdocument {
  name: string,
  count: number,
  emojiId?: Types.ObjectId,
  url?: string,
  emoji?: string,
  custom: boolean,
}

const reactionCountSchema = new Schema({
  name: { type: String },
  count: { type: Number, default: 0 },
  emojiId: { type: Types.ObjectId, ref: 'CustomEmoji' },
  url: { type: String },
  emoji: { type: String },
  custom: { type: Boolean, required: true },
});

export { reactionCountSchema };