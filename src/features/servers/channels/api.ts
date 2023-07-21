import api from '@services/api';

export type ChannelPermissionsData = {
  private: boolean;
  view: string[];
  message: string[];
}

export type ChannelData = {
  _id: string;
  name: string;
  type: 'text' | 'voice';
  permissions: ChannelPermissionsData;
};

const channelApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getChannels: build.query<ChannelData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/channels`,
          method: 'get',
        }),
      })
    };  
  }
});

export default channelApi;

export const {
  useGetChannelsQuery,
} = channelApi;