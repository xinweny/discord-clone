import mongoose, { Schema, Types } from 'mongoose';

import { Message, IMessage } from './Message';

Message.discriminator('channel', new Schema({
  roomId: { type: Types.ObjectId, required: true, refPath: 'Server.channels' },
  serverId: { type: Types.ObjectId, required: true, ref: 'Server' }
}));

export const MessageChannel = mongoose.model<IMessage>('channel');