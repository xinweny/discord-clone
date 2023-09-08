import mongoose, { Schema, Types } from 'mongoose';

import { IRole } from '@api/servers/roles/schema';

export interface IServerMember extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  serverId: Types.ObjectId;
  displayName: string;
  roleIds: Types.ObjectId[];
  bio: string;
  bannerColor: string;
  roles?: IRole[];
}

const serverMemberSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  serverId: { type: Types.ObjectId, ref: 'Server', required: true },
  displayName: { type: String, required: true },
  roleIds: { type: [Types.ObjectId], ref: 'Server.roles', default: [] },
  bio: { type: String, default: '', length: { max: 190 } },
  bannerColor: { type: String, default: '' },
}, {
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'server_members',
});

serverMemberSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

serverMemberSchema.virtual('server', {
  ref: 'Server',
  localField: 'serverId',
  foreignField: '_id',
  justOne: true,
});

serverMemberSchema.set('toJSON', { virtuals: true });
serverMemberSchema.set('toObject', { virtuals: true });

serverMemberSchema.index({ userId: 1, serverId: 1 }, { unique: true });

export const ServerMember = mongoose.model<IServerMember>('ServerMember', serverMemberSchema);