import { ChannelData } from '@features/channels/types';

export interface ServerData {
  _id: string;
  name: string;
  createdAt: Date;
  memberCount: number;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  ownerId: string;
  private: boolean;
  channels: ChannelData[];
}

export type ServerBasicData = {
  _id: string;
  name: string;
  avatarUrl?: string;
};

export type PublicServerData = Omit<ServerData, 'private'>;

export type UserServerData = Pick<ServerData, '_id' | 'name' | 'avatarUrl' | 'channels'>;

export type CreateServerFields = {
  name: string;
  file?: File;
};

export type EditServerFields = {
  serverId: string;
  name: string;
  description: string;
  avatar?: File;
  banner?: File;
};

export type GetPublicServersQuery = {
  query: string;
  page?: number;
  limit?: number;
};