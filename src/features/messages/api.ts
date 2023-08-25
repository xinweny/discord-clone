import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/dist/query';
import _ from 'lodash';

import api from '@services/api';

import { signAndUpload } from '@services/cloudinary';

import { ApiCursorPaginationData } from '@types';

import {
  MessageData,
  GetMessagesQuery,
  CreateMessageFields,
  EditMessageFields,
} from './types';

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
        serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
          const { serverId, roomId } = queryArgs;

          return defaultSerializeQueryArgs({
            queryArgs: { serverId, roomId },
            endpointDefinition,
            endpointName
          });
        },
        merge: (currentCache, newMessages) => {
          currentCache.items.push(...newMessages.items);

          currentCache.next = newMessages.next;
        },
        forceRefetch: ({ currentArg, previousArg }) => !(_.isEqual(currentArg, previousArg)),
      }),
      sendMessage: build.mutation<MessageData, CreateMessageFields>({
        query: ({ serverId, roomId, body, attachments }) => ({
          url: `${serverId ? `/servers/${serverId}/channels` : '/dms'}/${roomId}/messages`,
          method: 'post',
          data: {
            body,
            ...(attachments.length > 0 && {
              attachments: attachments.map(file => ({
                filename: file.name,
                mimetype: file.type,
                bytes: file.size,
              })),
            }),
          },
        }),
        onQueryStarted: async ({ serverId, roomId, attachments }, { dispatch, queryFulfilled }) => {
          try {
            const { data: message } = await queryFulfilled;

            if (attachments.length > 0) await signAndUpload(
              attachments,
              `/attachments/${message._id}?${serverId ? `serverId=${serverId}` : ''}&roomId=${roomId}`
            );

            dispatch(messageApi.util.updateQueryData(
              'getMessages',
              { serverId, roomId, next: null },
              (draftMsgs) => {
                draftMsgs.items.push(message);
                return draftMsgs;
              }
            ));
          } catch (err) {
            console.log(err);
          }
        },
      }),
      editMessage: build.mutation<MessageData, EditMessageFields>({
        query: ({ serverId, roomId, messageId, body }) => ({
          url: `${serverId ? `/servers/${serverId}/channels` : '/dms'}/${roomId}/messages/${messageId}`,
          method: 'put',
          data: { body },
        }),
        onQueryStarted: async ({ serverId, roomId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: message } = await queryFulfilled;

            dispatch(messageApi.util.updateQueryData(
              'getMessages',
              { serverId, roomId, next: null },
              (draftMsgs) => {
                const index = draftMsgs.items.findIndex(
                  msg => msg._id === message._id
                );

                if (index !== -1) {
                  draftMsgs.items[index] = {
                    ...draftMsgs.items[index],
                    ...message,
                  };
                }

                return draftMsgs;
              }
            ));
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
  useEditMessageMutation,
} = messageApi;