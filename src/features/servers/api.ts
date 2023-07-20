import { FieldValues } from 'react-hook-form';

import api from '@services/api';

import { sign, upload } from '@services/cloudinary';

import type { ApiPaginationData } from '@types';

export interface Server {
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

export type PublicServer = Omit<Server, 'private'>;
export type UserServer = Pick<Server, '_id' | 'name' | 'avatarUrl'>;

const serverApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getPublicServers: build.query<ApiPaginationData<PublicServer>, string>({
        query: (query) => ({
          url: `/servers?query=${query}`,
          method: 'get',
        }),
      }),
      getJoinedServers: build.query<UserServer[], string>({
        query: (userId) => ({
          url: `/users/${userId}/servers`,
          method: 'get',
        }),
        providesTags: ['JoinedServers'],
      }),
      createServer: build.mutation<Server, FieldValues>({
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
  useGetJoinedServersQuery,
  useCreateServerMutation,
} = serverApi;