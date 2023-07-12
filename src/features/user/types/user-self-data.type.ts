import { UserRelation, UserDM, UserServer } from '.';

export interface UserSelfData {
  id: string;
  bio: string;
  bannerColor: string;
  displayName: string;
  email: string;
  password: string;
  relations: UserRelation[];
  dms: UserDM[];
  servers: UserServer[];
}