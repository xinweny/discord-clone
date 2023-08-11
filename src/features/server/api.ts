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
      }),
    };
  }
});

export default serverApi;

export const {
  useGetServerQuery,
} = serverApi;