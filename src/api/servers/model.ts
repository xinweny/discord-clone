import mongoose, { Schema, Types, Document } from 'mongoose';

import env from '@config/env';

import { CustomError } from '@helpers/CustomError';

import { roleSchema, IRole } from './roles/schema';
import { categorySchema, ICategory } from './categories/schema';
import { customEmojiSchema, ICustomEmoji } from './customEmojis/schema';
import { channelSchema, IChannel } from './channels/schema';
import { IServerMember } from '../serverMembers/model';

export interface IServer extends Document {
  ownerId: Types.ObjectId;
  name: string;
  roles: Types.DocumentArray<IRole>;
  categories: Types.DocumentArray<ICategory>;
  channels: Types.DocumentArray<IChannel>;
  customEmojis: Types.DocumentArray<ICustomEmoji>;
  memberCount: number;
  avatarUrl?: string;
  bannerUrl?: string;
  private: boolean;
  checkPermissions(member: IServerMember, permissionKeys: string[]): boolean;
}

const serverSchema = new Schema({
  ownerId: { type: Types.ObjectId, ref: 'ServerMember', required: true },
  name: { type: String, required: true, unique: true },
  roles: { type: [roleSchema], default: () => ([]) },
  categories: { type: [categorySchema], default: () => ([]) },
  channels: { type: [channelSchema], default: () => ([]) },
  customEmojis: { type: [customEmojiSchema], default: () => ([]) },
  avatarUrl: { type: String, default: '' },
  bannerUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  memberCount: { type: Number, required: true, default: 1 },
  private: { type: Boolean, default: false },
}, {
  timestamps: { createdAt: true, updatedAt: false },
});

serverSchema.pre('save', function (next) {
  for (const subdocs of [this.roles, this.customEmojis]) {
    if (subdocs) {
      const names = subdocs.map(subdoc => subdoc.name);
      if ((new Set(names)).size !== names.length) throw new CustomError(400, 'Duplicate values not allowed.');
    }
  }

  if (this.customEmojis?.length > 100) throw new CustomError(400, 'Custom emoji limit (100) exceeded.');
  next();
});

serverSchema.method(
  'checkPermissions',
  function (member: IServerMember, permissionKeys: string[] = []) {
    if (this.ownerId.equals(member._id)) return true;

    const roles = this.roles;

    if (member.roleIds.some(id => {
      const role = roles.id(id);

      if (!role) return false;
      if (role.permissions.administrator) return true;

      if (permissionKeys.some(key => role.permissions[key])) return true;

      return false;
    })) return true;

    return false;
  }
);

if (env.NODE_ENV === 'development') {
  serverSchema.index(
    {
      name: 'text',
      description: 'text',
    },
    {
      weights: {
        name: 5,
        description: 1,
        memberCount: 3,
      }
    }
  );
}

export const Server = mongoose.model<IServer>('Server', serverSchema);