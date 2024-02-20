import mongoose, { Types, Document } from 'mongoose';

export interface IServerInvite extends Document {
  urlId: string;
  url: string;
  serverId: Types.ObjectId;
}

const serverInviteSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  serverId: { type: Types.ObjectId, ref: 'Server', required: true, unique: true },
});

serverInviteSchema.index({ serverId: 1 });
serverInviteSchema.index({ url: 1 });

export const ServerInvite = mongoose.model<IServerInvite>('Url', serverInviteSchema, 'server_invites');