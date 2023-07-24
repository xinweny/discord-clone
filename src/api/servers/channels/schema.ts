import { Schema, Types } from 'mongoose';

export interface IChannelPermissions {
  private: boolean;
  view: Types.ObjectId[];
  message: Types.ObjectId[];
}

export interface IChannel extends Types.Subdocument {
  name: string;
  type: string;
  permissions: IChannelPermissions;
  categoryId: Types.ObjectId;
}

const channelSchema = new Schema({
  name: { type: String, required: true, length: { max: 32 } },
  type: { type: String, enum: ['text', 'voice'] },
  permissions: {
    type: {
      private: { type: Boolean, default: false },
      view: { type: [Types.ObjectId], refPath: 'Server.roles' },
      message: { type: [Types.ObjectId], refPath: 'Server.roles' },
    },
    default: {},
  },
  categoryId: { type: Types.ObjectId },
});

export { channelSchema };