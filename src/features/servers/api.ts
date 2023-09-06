import api from '@services/api';

import type {
  EditServerFields,
  ServerData,
  PublicServerData,
  UserServerData,
  CreateServerFields,
} from './types';
import type { ApiPaginationData } from '@types';

import { signAndUpload } from '@services/cloudinary';

const serverApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServer: build.query<ServerData, string>({
        query: (serverId) => ({
          url: `/servers/${serverId}`,
          method: 'get',
        }),
        providesTags: (...[, , serverId]) => [{ type: 'Server', id: serverId }],
      }),
      editServer: build.mutation<ServerData, EditServerFields>({
        query: ({ serverId, name, description, avatar, banner }) => ({
          url: `/servers/${serverId}`,
          method: 'put',
          data: {
            name,
            description,
            avatarFileName: avatar?.name,
            bannerFileName: banner?.name,
          },
        }),
        onQueryStarted: async ({ avatar, banner }, { dispatch, queryFulfilled }) => {
          try {
            const { data: server } = await queryFulfilled;

            const serverId = server._id;

            await Promise.all([
              avatar
                ? signAndUpload(avatar, `/avatars/servers/${serverId}`, serverId)
                : Promise.resolve(),
              banner
                ? signAndUpload(banner, `/banners/servers/${serverId}`, serverId)
                : Promise.resolve(),
            ]);
  
            dispatch(api.util.invalidateTags([
              { type: 'Server', id: serverId },
              'JoinedServers',
            ]));
          } catch (err) {
            console.log(err);
          }
        },
      }),
      deleteServer: build.mutation<ServerData, string>({
        query: (serverId) => ({
          url: `/servers/${serverId}`,
          method: 'delete',
        }),
        invalidatesTags: (...[, , serverId]) => [
          { type: 'Server', id: serverId },
          'JoinedServers',
        ],
      }),
      getPublicServers: build.query<ApiPaginationData<PublicServerData>, string>({
        query: (query) => ({
          url: `/servers?query=${query}`,
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
      createServer: build.mutation<ServerData, CreateServerFields>({
        query: ({ name, file }) => ({
          url: '/servers',
          method: 'post',
          data: { name, filename: file?.name },
        }),
        onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
          try {
            const { data: server } = await queryFulfilled;

            const serverId = server._id;

            if (file) await signAndUpload(file, `/avatars/servers/${serverId}`, serverId);
  
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
  useGetServerQuery,
  useEditServerMutation,
  useDeleteServerMutation,
  useGetPublicServersQuery,
  useGetJoinedServersQuery,
  useCreateServerMutation,
} = serverApi;