import api from '@services/api';

import { ApiCursorPaginationData } from '@types';

type AttachmentData = {
  url: string;
  mimetype: string;
  filename: string;
};

export type MessageData = {
  _id: string;
  roomId: string;
  senderId: string;
  serverId?: string;
  body: string;
  attachments: AttachmentData[];
  createdAt: string;
  updatedAt?: string;
  user: {
    avatarUrl: string;
    username: string;
    displayName: string;
  };
  serverMember?: {
    displayName: string;
  };
};

type MessageQuery = {
  serverId?: string;
  roomId: string;
  next?: string | null;
};

const messageApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getMessages: build.query<ApiCursorPaginationData<MessageData>, MessageQuery>({
        query: ({ serverId, roomId, next }) => {
          const base = serverId ? `/servers/${serverId}/channels` : '/dms';
          const queryParams = next ? `next=${next}` : '';

          const url =  `${base}/${roomId}/messages?${queryParams}`;

          return { url, method: 'get' };
        },
        serializeQueryArgs: ({ endpointName }) => endpointName,
        merge: (currentCache, newMessages) => {
          currentCache.items.push(...newMessages.items);

          currentCache.next = newMessages.next;
        },
        forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      }),
      sendMessage: build.mutation({
        query: ({ serverId, roomId, body, attachments }) => ({
          url: `${serverId ? `/servers/${serverId}/channels` : '/dms'}/${roomId}/messages`,
          method: 'post',
          data: {
            body,
            attachments,
          },
        }),
      }),
    };  
  }
});

export default messageApi;

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messageApi;