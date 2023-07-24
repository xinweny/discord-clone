import api from '@services/api';

import { ApiPaginationData } from '@types';

export type MessageData = {
  _id: string;
};

type MessageQuery = {
  serverId?: string;
  roomId: string;
  page: number;
};

// TODO: CHANGE TO POINTER SCROLL

const messageApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getMessages: build.query<ApiPaginationData<MessageData>, MessageQuery>({
        query: ({ serverId, roomId, page }) => ({
          url: serverId
            ? `/servers/${serverId}/channels/${roomId}/messages?page=${page}`
            : `/dms/${roomId}/messages?page=${page}`,
          method: 'get',
        }),
        serializeQueryArgs: ({ endpointName }) => endpointName,
        merge: (currentCache, newMessages) => {
          currentCache.items.push(...newMessages.items);

          currentCache.currentPage = newMessages.currentPage;
          currentCache.totalDocs = newMessages.totalDocs;
          currentCache.totalPages = newMessages.totalPages;
        },
        forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      }),
    };  
  }
});

export default messageApi;

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
} = messageApi;