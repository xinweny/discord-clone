import { RelationData } from '@types';

export type FriendRequestData = RelationData & {
  status: 0;
};

export type CreateFriendRequestFields = {
  senderId: string;
  username?: string;
  recipientId?: string;
};