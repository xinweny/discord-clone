import api from '@services/api';

export type ChannelPermissionsData = {
  private: boolean;
  view: string[];
  message: string[];
};

export type ChannelTypes = 'text' | 'voice';

export type ChannelData = {
  _id: string;
  name: string;
  type: ChannelTypes
  permissions: ChannelPermissionsData;
  categoryId?: string;
  description: string;
};

type CreateChannelQuery = {
  serverId: string;
  name: string;
  type: ChannelTypes;
  categoryId?: string;
};

type EditChannelQuery = {
  channelId: string;
  serverId: string;
  name: string;
  description: string;
};

const channelApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getChannels: build.query<ChannelData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/channels`,
          method: 'get',
        }),
        providesTags: (...[, , serverId]) => [{ type: 'Channels', id: serverId }],
      }),
      createChannel: build.mutation<ChannelData, CreateChannelQuery>({
        query: ({ serverId, name, type, categoryId }) => ({
          url: `/servers/${serverId}/channels`,
          method: 'post',
          data: {
            name,
            type,
            categoryId,
          },
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Channels', id: serverId }],
      }),
      editChannel: build.mutation<ChannelData, EditChannelQuery>({
        query: ({ serverId, channelId, name, description }) => ({
          url: `/servers/${serverId}/channels/${channelId}`,
          method: 'put',
          data: {
            name,
            description,
          },
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Channels', id: serverId }],
      }),
    };  
  }
});

export default channelApi;

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useEditChannelMutation,
} = channelApi;