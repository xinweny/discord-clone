export type ChannelPermissionsData = {
  private: boolean;
  view: string[];
  message: string[];
};

export enum ChannelTypes {
  TEXT = 'text',
  VOICE = 'voice',
}

export type ChannelData = {
  _id: string;
  name: string;
  type: ChannelTypes
  permissions: ChannelPermissionsData;
  categoryId?: string;
  description: string;
};

export type CreateChannelFields = {
  serverId: string;
  name: string;
  type: ChannelTypes;
  categoryId?: string;
  private: boolean;
};

export type EditChannelFields = {
  channelId: string;
  serverId: string;
  name: string;
  description: string;
};

export type DeleteChannelFields = {
  channelId: string;
  serverId: string;
};