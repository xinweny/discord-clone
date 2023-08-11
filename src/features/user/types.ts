export type UserDMData = {
  id: string;
  name?: string;
  imageUrl: string;
  participantIds: string[];
  participants?: {
    id: string;
    displayName: string;
  }[];
};

export type UserRelationData = {
  id: string;
  userId: string;
  status: 0 | 1 | 2;
  updatedAt: Date;
};

export type UserServerData = {
  id: string;
  name: string;
  imageUrl: string;
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
  relations: UserRelationData[];
  dms: UserDMData[];
  servers: UserServerData[];
};

export type UpdateUserFields = {
  userId: string;
  file?: File;
  username?: string;
  displayName?: string;
  bannerColor?: string;
  bio?: string;
};