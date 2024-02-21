import mongoose, { Schema, Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError.js';

export interface ICustomEmoji extends Types.Subdocument {
  creatorId: Types.ObjectId;
  serverId: Types.ObjectId;
  name: string;
  url: string;
}

const customEmojiSchema = new Schema({
  serverId: { type: Types.ObjectId, ref: 'Server', required: true },
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

customEmojiSchema.pre('save', async function (next) {
  const num = await CustomEmoji.count({ serverId: this.serverId });

  if (num > 100) throw new CustomError(500, 'Max emoji limit reached.');

  next();
});

customEmojiSchema.index({
  serverId: 1,
});

export const CustomEmoji = mongoose.model<ICustomEmoji>('CustomEmoji', customEmojiSchema, 'custom_emojis');