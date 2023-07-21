import api from '@services/api';

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