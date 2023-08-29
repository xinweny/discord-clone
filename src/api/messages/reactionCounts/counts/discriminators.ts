import mongoose, { Schema, Types } from 'mongoose';

import { countSchema, ICount } from './schema';

export interface ICustomCount extends ICount {
  emojiId: Types.ObjectId;
  url: string;
}

export interface IDefaultCount extends ICount {
  unified: string;
  native: string;
}

countSchema.discriminator('custom', new Schema({
  emojiId: { type: Types.ObjectId, ref: 'CustomEmoji', required: true },
  url: { type: String, required: true },
}));

countSchema.discriminator('default', new Schema({
  unified: { type: String, required: true },
  native: { type: String, required: true },
}));

export const CustomEmojiCount = mongoose.model<ICustomCount>('custom');

export const EmojiCount = mongoose.model<IDefaultCount>('default');