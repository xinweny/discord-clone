import { Schema, Types } from 'mongoose';

export interface IPermissions {
  administrator: boolean;
  viewChannels: boolean;
  manageChannels: boolean;
  manageRoles: boolean;
  manageExpressions: boolean;
  kickMembers: boolean;
  manageServer: boolean;
  createInvite: boolean;
  sendMessages: boolean;
  manageMessages: boolean;
  addReactions: boolean;
  joinCall: boolean;
  speak: boolean;
  video: boolean;
}

export interface IRole extends Types.Subdocument {
  name: string,
  color: string,
  permissions: IPermissions,
  memberCount?: number;
}

export const defaultRoleFields = {
  name: '@everyone',
  color: '#99AAB5',
  permissions: {
    administrator: false,
    viewChannels: true,
    manageChannels: false,
    manageRoles: false,
    manageExpressions: false,
    kickMembers: false,
    manageServer: false,
    createInvite: true,
    sendMessages: true,
    manageMessages: false,
    addReactions: true,
    joinCall: true,
    speak: true,
    video: true,
  },
};

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