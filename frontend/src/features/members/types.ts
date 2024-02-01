export type ServerMemberData = {
  _id: string;
  userId: string;
  serverId: string;
  displayName: string;
  roleIds: string[];
  bio: string;
  bannerColor: string;
  user: {
    avatarUrl: string;
    username: string;
    createdAt: string;
    customStatus?: string;
  };
  createdAt: string;
};

export type ServerMemberMainData = Omit<ServerMemberData, 'bio' | 'bannerColor' | 'roleIds' | 'createdAt'>;

export type GetUserServerMemberQuery = {
  userId: string;
  serverId: string;
};

export type GetServerMemberQuery = {
  memberId: string;
  serverId: string;
};

export type DeleteServerMemberFields = {
  memberId: string;
  serverId: string;
};

export type EditServerMemberFields = {
  memberId: string;
  serverId: string;
  displayName: string;
  bio: string;
  bannerColor: string;
};

export enum ServerMemberEvent {
  Join = 'server_member:join',
  Update = 'server_member:update',
  Leave = 'server_member:leave',
}