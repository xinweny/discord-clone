import api from '@services/api';

import type { GetMutualsQuery } from './types';

import type { ServerData } from '@features/servers/types';
import type { UserBasicData } from '@features/users/types';

const mutualsApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getMutualServers: build.query<ServerData[], GetMutualsQuery>({
        query: ({ userId1, userId2 }) => ({
          url: `/users/${userId1}/mutuals/${userId2}/servers`,
          method: 'get',
        }),
        providesTags: (...[, , { userId2 }]) => [{ type: 'MutualServers', id: userId2 }],
      }),
      getMutualFriends: build.query<UserBasicData[], GetMutualsQuery>({
        query: ({ userId1, userId2 }) => ({
          url: `/users/${userId1}/mutuals/${userId2}/friends`,
          method: 'get',
        }),
        providesTags: (...[, , { userId2 }]) => [{ type: 'MutualFriends', id: userId2 }],
      }),
    };
  }
});

export default mutualsApi;

export const {
  useGetMutualServersQuery,
  useGetMutualFriendsQuery,
} = mutualsApi;