import mongoose, { Schema, Types } from 'mongoose';

import { Message, IMessage } from './Message';

Message.discriminator('direct', new Schema({
  roomId: { type: Types.ObjectId, required: true, ref: 'DM' },
}));

export const MessageDirect = mongoose.model<IMessage>('direct');