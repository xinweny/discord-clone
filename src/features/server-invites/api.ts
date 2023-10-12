import api from '@services/api';

import type { ServerInviteData } from './types';

const serverInviteApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerInvite: build.query<ServerInviteData, string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/invite`,
          method: 'get',
        }),
        providesTags: (...[, , serverId]) => [{ type: 'ServerInvite', id: serverId }],
      }),
    };
  }
});

export default serverInviteApi;

export const {
  useGetServerInviteQuery,
} = serverInviteApi;