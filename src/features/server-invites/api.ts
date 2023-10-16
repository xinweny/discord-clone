import api from '@services/api';

import type {
  ServerInviteData,
  GetServerInviteQuery,
} from './types';

const serverInviteApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerInvite: build.query<ServerInviteData, GetServerInviteQuery>({
        query: ({ serverId, urlId }) => ({
          url: '/invites',
          params: { serverId, urlId },
          method: 'get',
        }),
        providesTags: (...[, , { serverId }]) => [{ type: 'ServerInvite', id: serverId }],
      }),
    };
  }
});

export default serverInviteApi;

export const {
  useGetServerInviteQuery,
  useLazyGetServerInviteQuery,
} = serverInviteApi;