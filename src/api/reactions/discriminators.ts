import mongoose, { Schema, Types } from 'mongoose';

import { reactionSchema, IReaction } from './model';

export interface ICustomCount extends IReaction {
  emojiId: Types.ObjectId;
  url: string;
}

export interface IDefaultCount extends IReaction {
  unified: string;
  native: string;
}

reactionSchema.discriminator('custom', new Schema({
  emojiId: { type: Types.ObjectId, ref: 'CustomEmoji', required: true },
  url: { type: String, required: true },
}));

reactionSchema.discriminator('default', new Schema({
  unified: { type: String, required: true },
  native: { type: String, required: true },
}));

export const CustomEmojiReaction = mongoose.model<ICustomCount>('custom');

export const EmojiReaction = mongoose.model<IDefaultCount>('default');