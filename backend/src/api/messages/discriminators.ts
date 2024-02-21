import mongoose, { Schema, Types } from 'mongoose';

import { Message, IMessage } from './model.js';

Message.discriminator('channel', new Schema({
  roomId: { type: Types.ObjectId, required: true, refPath: 'Server.channels' },
  serverId: { type: Types.ObjectId, required: true, ref: 'Server' }
}));

Message.discriminator('dm', new Schema({
  roomId: { type: Types.ObjectId, required: true, ref: 'DM' },
}));

export const MessageChannel = mongoose.model<IMessage>('channel');

export const MessageDirect = mongoose.model<IMessage>('dm');