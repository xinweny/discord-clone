import api from '@services/api';

import { signAndUpload } from '@services/cloudinary';

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

type GetMessagesQuery = {
  serverId?: string;
  roomId: string;
  next?: string | null;
};

type CreateMessageQuery = {
  serverId?: string;
  roomId: string;
  body: string;
  attachments: File[];
};

const messageApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getMessages: build.query<ApiCursorPaginationData<MessageData>, GetMessagesQuery>({
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
      sendMessage: build.mutation<MessageData, CreateMessageQuery>({
        query: ({ serverId, roomId, body, attachments }) => ({
          url: `${serverId ? `/servers/${serverId}/channels` : '/dms'}/${roomId}/messages`,
          method: 'post',
          data: {
            body,
            ...(attachments.length > 0 && {
              filenames: attachments.map(file => file.name),
            }),
          },
        }),
        onQueryStarted: async ({ attachments }, {  queryFulfilled }) => {
          try {
            const { data: message } = await queryFulfilled;

            if (attachments.length > 0) await signAndUpload(attachments, `/attachments/${message._id}`);
          } catch (err) {
            console.log(err);
          }
        },
      }),
    };  
  }
});

export default messageApi;

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messageApi;