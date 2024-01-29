import { DMData } from '@features/dms/types';
import { RelationData } from '@features/relations/types';
import { ServerBasicData } from '@features/servers/types';

export type UserBasicData = {
  _id: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  customStatus?: string;
};

export type UserSelfData = {
  id: string;
  bio: string;
  bannerColor: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  password: string;
  relations: RelationData[];
  dms: DMData[];
  servers: ServerBasicData[];
  customStatus?: string;
  createdAt: string;
  _id: string;
};

export type UserData = {
  _id: string;
  id: string;
  bio: string;
  bannerColor: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  createdAt: string;
  customStatus?: string;
};

export type UpdateUserFields = {
  userId: string;
  file?: File;
  username?: string;
  displayName?: string;
  bannerColor?: string;
  bio?: string;
  customStatus?: string;
};

export type UpdateSensitiveFields = {
  userId: string;
  currentPassword: string;
  username?: string;
  password?: string;
};