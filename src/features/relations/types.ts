import { UserBasicData } from '@features/users/types';

export enum RelationStatus {
  PENDING_TO = 'pending_to',
  PENDING_FROM = 'pending_from',
  FRIENDS = 'friends',
  BLOCKED = 'blocked',
}

export enum ContactsTabs {
  ONLINE = 'online',
  ALL = 'all',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

export type RelationData<T = RelationStatus> = {
  _id: string;
  userId: string;
  status: T;
  updatedAt: string;
  user: UserBasicData;
};

export type FriendRequestData = RelationData<RelationStatus.PENDING_FROM | RelationStatus.PENDING_TO>;

export type SendFriendRequestFields = {
  senderId: string;
  username?: string;
  recipientId?: string;
};

export type AcceptFriendRequestFields = {
  senderId: string;
  relationId: string;
};

export type RemoveRelationFields = {
  senderId: string;
  relationId: string;
  status: RelationStatus;
};