import { Schema, Types } from 'mongoose';

export interface IRole extends Types.Subdocument {
  name: string,
  color: string,
  permissions: {
    [key: string]: boolean,
  },
  memberCount?: number;
}

const roleSchema = new Schema({
  name: { type: String },
  color: { type: String, required: true },
  permissions: {
    administrator: { type: Boolean, default: false },
    viewChannels: { type: Boolean, default: false },
    manageChannels: { type: Boolean, default: false },
    manageRoles: { type: Boolean, default: false },
    manageExpressions: { type: Boolean, default: false },
    kickMembers: { type: Boolean, default: false },
    manageServer: { type: Boolean, default: false },
    createInvite: { type: Boolean, default: false },
    sendMessages: { type: Boolean, default: false },
    manageMessages: { type: Boolean, default: false },
    addReactions: { type: Boolean, default: false },
    joinCall: { type: Boolean, default: false },
    speak: { type: Boolean, default: false },
    video: { type: Boolean, default: false },
  },
});

roleSchema.virtual('memberCount', {
  ref: 'ServerMember',
  localField: '_id',
  foreignField: 'roleIds',
  justOne: false,
  count: true,
});

roleSchema.set('toJSON', { virtuals: true });
roleSchema.set('toObject', { virtuals: true });

export { roleSchema };