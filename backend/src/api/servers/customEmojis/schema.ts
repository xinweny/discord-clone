import { Schema, Types } from 'mongoose';

export interface ICustomEmoji extends Types.Subdocument {
  creatorId: Types.ObjectId;
  name: string;
  url: string;
}

const customEmojiSchema = new Schema({
  creatorId: { type: Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

customEmojiSchema.virtual('creator', {
  ref: 'User',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
});

customEmojiSchema.set('toJSON', { virtuals: true });
customEmojiSchema.set('toObject', { virtuals: true });

export { customEmojiSchema };