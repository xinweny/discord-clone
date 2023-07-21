import { FieldValues } from 'react-hook-form';

import api from '@services/api';

import { sign, upload } from '@services/cloudinary';

import type { ApiPaginationData } from '@types';

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
}

export type PublicServerData = Omit<ServerData, 'private'>;
export type UserServerData = Pick<ServerData, '_id' | 'name' | 'avatarUrl'>;

const serverApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getPublicServers: build.query<ApiPaginationData<PublicServerData>, string>({
        query: (query) => ({
          url: `/servers?query=${query}`,
          method: 'get',
        }),
      }),
      getServer: build.query<ServerData, string>({
        query: (serverId) => ({
          url: `/servers/${serverId}`,
          method: 'get',
        }),
      }),
      getJoinedServers: build.query<UserServerData[], string>({
        query: (userId) => ({
          url: `/users/${userId}/servers`,
          method: 'get',
        }),
        providesTags: ['JoinedServers'],
      }),
      createServer: build.mutation<ServerData, FieldValues>({
        query: ({ name, file }) => ({
          url: '/servers',
          method: 'post',
          data: { name, filename: file?.name },
        }),
        onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
          try {
            const { data: server } = await queryFulfilled;

            if (file) {
              const serverId = server._id;
        
              const signature = await sign(`/avatars/servers/${serverId}`, file.name);
        
              await upload(file, signature, serverId);
            }
  
            dispatch(api.util.invalidateTags(['JoinedServers']));
          } catch (err) {
            console.log(err);
          }
        },
      }),
    };
  }
});

export default serverApi;

export const {
  useGetPublicServersQuery,
  useGetServerQuery,
  useGetJoinedServersQuery,
  useCreateServerMutation,
} = serverApi;