import { Schema, Types } from 'mongoose';

export enum RelationStatus {
  PENDING_TO = 'pending_to',
  PENDING_FROM = 'pending_from',
  FRIENDS = 'friends',
  BLOCKED = 'blocked',
}

export interface IRelation extends Types.Subdocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  status: RelationStatus;
  updatedAt: string;
}

const relationSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: RelationStatus,
    required: true,
  },
}, { timestamps: { createdAt: false, updatedAt: true } });

relationSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

relationSchema.set('toJSON', { virtuals: true });
relationSchema.set('toObject', { virtuals: true });

export { relationSchema };