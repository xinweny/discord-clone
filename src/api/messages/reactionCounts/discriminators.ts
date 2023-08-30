import mongoose, { Schema, Types } from 'mongoose';

import { reactionCountSchema, IReactionCount } from './model';

export interface ICustomCount extends IReactionCount {
  emojiId: Types.ObjectId;
  url: string;
}

export interface IDefaultCount extends IReactionCount {
  unified: string;
  native: string;
}

reactionCountSchema.discriminator('custom', new Schema({
  emojiId: { type: Types.ObjectId, ref: 'CustomEmoji', required: true },
  url: { type: String, required: true },
}));

reactionCountSchema.discriminator('default', new Schema({
  unified: { type: String, required: true },
  native: { type: String, required: true },
}));

export const CustomEmojiCount = mongoose.model<ICustomCount>('custom');

export const EmojiCount = mongoose.model<IDefaultCount>('default');