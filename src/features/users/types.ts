import { DMData } from '@features/dms/types';
import { RelationData } from '@features/relations/types';
import { ServerBasicData } from '@features/servers/types';

export type UserBasicData = {
  _id: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  customStatus: string;
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
  customStatus: string;
};

export type UpdateUserFields = {
  userId: string;
  file?: File;
  username?: string;
  displayName?: string;
  bannerColor?: string;
  bio?: string;
};

export enum StatusEvent {
  Get = 'user_status:get',
}

export type StatusEventPayload = {
  userId: string;
  status: boolean;
};

export type UserStatusesData = {
  [key: string]: boolean;
};