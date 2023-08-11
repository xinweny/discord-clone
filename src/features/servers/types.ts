import type { ServerData } from '@features/server/types';

export type PublicServerData = Omit<ServerData, 'private'>;
export type UserServerData = Pick<ServerData, '_id' | 'name' | 'avatarUrl'>;

export type CreateServerFields = {
  name: string;
  file?: File;
};