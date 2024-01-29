import mongoose, { Schema, Types } from 'mongoose';

import env from '@config/env';

import { CustomError } from '@helpers/CustomError';
export interface IDM extends Document {
  _id: Types.ObjectId;
  ownerId?: Types.ObjectId;
  participantIds: Types.ObjectId[];
  name?: string;
  imageUrl?: string;
  isGroup: boolean;
}

const dmSchema = new Schema({
  ownerId: { type: Types.ObjectId, ref: 'User' },
  participantIds: { type: [Types.ObjectId], ref: 'User', required: true },
  name: { type: String, length: { min: 1, max: 100 }, trim: true },
  imageUrl: { type: String },
  isGroup: { type: Boolean, required: true },
});

dmSchema.pre('save', async function (next) {
  if (this.participantIds.length > 10) throw new CustomError(400, 'Number of group members cannot exceed 10.');

  next();
});

dmSchema.virtual('participants', {
  ref: 'User',
  localField: 'participantIds',
  foreignField: '_id',
});

dmSchema.set('toJSON', { virtuals: true });
dmSchema.set('toObject', { virtuals: true });

if (env.NODE_ENV === 'development') {
  dmSchema.index(
    { participantIds: 1 },
    { unique: true, partialFilterExpression: { isGroup: { $eq: false } } },
  );
}

export const DM = mongoose.model<IDM>('DM', dmSchema, 'dms');