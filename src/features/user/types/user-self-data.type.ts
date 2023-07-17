import { UserRelation, UserDM, UserServer } from '.';

export interface UserSelfData {
  id: string;
  bio: string;
  bannerColor: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  password: string;
  relations: UserRelation[];
  dms: UserDM[];
  servers: UserServer[];
}