import mongoose, { Schema, Types } from 'mongoose';

import env from '@config/env';

export interface IReadStatus extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  serverId?: Types.ObjectId;
  roomId: Types.ObjectId;
  lastReadAt: Date;
}

export const readStatusSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  serverId: { type: Types.ObjectId },
  roomId: { type: Types.ObjectId, required: true },
  lastReadAt: { type: Date, required: true },
}, {
  collection: 'read_statuses',
});

export const ReadStatus = mongoose.model<IReadStatus>('ReadStatus', readStatusSchema);

if (env.NODE_ENV === 'development') {
  readStatusSchema.index({ userId: 1 });
  readStatusSchema.index({ roomId: 1 });
}