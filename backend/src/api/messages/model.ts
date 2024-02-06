import mongoose, { Schema, Types, Document } from 'mongoose';

import { attachmentSchema, IAttachment  } from './attachments/schema';

export interface IMessageEmoji extends Document {
  id: string;
  shortcode: string;
  url?: string;
  custom: boolean;
}

export interface IMessage extends Document {
  roomId: Types.ObjectId;
  senderId: Types.ObjectId;
  serverId?: Types.ObjectId;
  body: string;
  attachments: Types.DocumentArray<IAttachment>;
  createdAt: Date;
  updatedAt?: Date;
  type: 'channel' | 'dm';
  emojis: IMessageEmoji[];
}

const emojiSchema = new Schema({
  id: { type: String, required: true },
  shortcode: { type: String, required: true },
  url: { type: String },
  custom: { type: Boolean, required: true },
});

const messageSchema = new Schema({
  senderId: { type: Types.ObjectId, required: true, ref: 'User' },
  body: { type: String, required: true },
  attachments: { type: [attachmentSchema], default: [] },
  emojis: { type: [emojiSchema], default: [] },
  updatedAt: { type: Date },
},
{
  timestamps: { createdAt: true },
  discriminatorKey: 'type',
});

messageSchema.virtual('sender', {
  ref: 'User',
  localField: 'senderId',
  foreignField: '_id',
  justOne: true,
});

messageSchema.virtual('serverMember', {
  ref: 'ServerMember',
  localField: 'senderId',
  foreignField: 'userId',
  justOne: true,
});

messageSchema.set('toJSON', { virtuals: true });
messageSchema.set('toObject', { virtuals: true });

export const Message = mongoose.model<IMessage>('Message', messageSchema);