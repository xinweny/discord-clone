import api from '@services/api';

import type { ApiPaginationData } from '@types';

export interface PublicServer {
  _id: string;
  name: string;
  createdAt: Date;
  memberCount: number;
  description: string;
  imageUrl: string;
}

const serverApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getPublicServers: build.query<ApiPaginationData<PublicServer>, string>({
        query: (query) => ({
          url: `/servers?query=${query}`,
          method: 'get',
        }),
      }),
    };
  }
});

export default serverApi;

export const {
  useGetPublicServersQuery,
} = serverApi;