import mongoose, { Types, Schema, Document } from 'mongoose';

import { IServer } from '@api/servers/model.js';

import { CustomError } from '@helpers/CustomError.js';
import { relationSchema, IRelation } from './relations/schema.js';

export interface IUser extends Document {
  username: string;
  displayName: string;
  password: string;
  email: string;
  verified: boolean;
  avatarUrl?: string;
  customStatus?: string;
  role: string;
  relations: Types.DocumentArray<IRelation>;
  dmIds: Types.ObjectId[];
  serverIds: Types.ObjectId[];
  servers?: IServer[];
  bio: string;
  bannerColor: string;
  relationTo(userId: Types.ObjectId | string): IRelation | undefined;
}

export interface IReqUser extends Document {
  email: string;
  username: string;
  verified: boolean;
  role: string;
}

const userSchema = new Schema({
  username: { type: String, required: true, length: { min: 2, max: 32 }, unique: true },
  displayName: { type: String, required: true, length: { min: 2, max: 32 } },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, select: false, unique: true },
  verified: { type: Boolean, default: true, select: false },
  avatarUrl: { type: String },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user',
    select: false,
  },
  relations: { type: [relationSchema], default: [], select: false },
  dmIds: { type: [Types.ObjectId], ref: 'DM', default: [] },
  serverIds: { type: [Types.ObjectId], ref: 'Server', default: [] },
  bio: { type: String, default: '', length: { max: 190 } },
  customStatus: { type: String, length: { max: 128 }, default: '' },
  bannerColor: { type: String, default: '' },
}, { timestamps: true });

userSchema.pre('save', function (next) {
  const userIds = this.relations.map(relation => relation.userId.toString());
  
  if ((new Set(userIds)).size !== userIds.length) throw new CustomError(400, 'Duplicate user IDs not allowed.');

  next();
});

userSchema.virtual('servers', {
  ref: 'Server',
  localField: 'serverIds',
  foreignField: '_id',
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.method(
  'relationTo',
  function (userId: Types.ObjectId | string) {
    return this.relations.find(relation => relation.userId.prototype?.equals(userId));
  }
);

userSchema.index({ createdAt: 1 }, {
  expireAfterSeconds: 60 * 60,
  partialFilterExpression: { verified: false },
});

export const User = mongoose.model<IUser>('User', userSchema);