import api from '@services/api';

import type {
  ChannelData,
  CreateChannelFields,
  EditChannelFields,
  DeleteChannelFields,
} from './types';

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
      createChannel: build.mutation<ChannelData, CreateChannelFields>({
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
      editChannel: build.mutation<ChannelData, EditChannelFields>({
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
      deleteChannel: build.mutation<void, DeleteChannelFields>({
        query: ({ serverId, channelId }) => ({
          url: `/servers/${serverId}/channels/${channelId}`,
          method: 'delete',
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Channels', id: serverId }],
      }),
    };  
  }
});

export default channelApi;

export const {
  useGetChannelsQuery,
  useLazyGetChannelsQuery,
  useCreateChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
} = channelApi;