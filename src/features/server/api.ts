import api from '@services/api';

import type { ServerData } from './types';

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
      deleteServer: build.mutation<ServerData, string>({
        query: (serverId) => ({
          url: `/servers/${serverId}`,
          method: 'delete',
        }),
        invalidatesTags: (...[, , serverId]) => [{ type: 'Server', id: serverId }],
      }),
    };
  }
});

export default serverApi;

export const {
  useGetServerQuery,
  useDeleteServerMutation,
} = serverApi;