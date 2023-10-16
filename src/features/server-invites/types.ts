export type ServerInviteData = {
  _id: string;
  serverId: string;
  url: string;
};

export type GetServerInviteQuery = {
  serverId?: string;
  urlId?: string;
};

export type GetServerInvitesQuery = {
  urlIds: string[];
};