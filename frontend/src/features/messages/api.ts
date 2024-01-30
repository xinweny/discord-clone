import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/dist/query';
import _ from 'lodash';

import type { ApiCursorPaginationData } from '@types';
import {
  MessageEvent,
  MessageData,
  GetMessagesQuery,
  SendMessageFields,
  EditMessageFields,
  DeleteMessageFields,
} from './types';

import api from '@services/api';

import { messageBaseUrl } from '@utils';

import { signAndUpload } from '@services/cloudinary';
import { emitEvents, setupSocketEventListeners } from '@services/websocket';

const messageApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getMessages: build.query<ApiCursorPaginationData<MessageData>, GetMessagesQuery>({
        query: ({ serverId, roomId, next }) => ({
          url: messageBaseUrl({ serverId, roomId }),
          method: 'get',
          params: { next },
        }),
        providesTags: (...[, , { serverId }]) => [{ type: 'Messages', id: serverId }],
        serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
          const { serverId, roomId } = queryArgs;

          return defaultSerializeQueryArgs({
            queryArgs: { serverId, roomId },
            endpointDefinition,
            endpointName,
          });
        },
        merge: (currentCache, newMessages) => {
          if (newMessages.items) {
            currentCache.items.push(...newMessages.items);
            currentCache.items = [...new Map(currentCache.items.map(item => [item._id, item])).values()];
            currentCache.next = newMessages.next;
          }
        },
        forceRefetch: ({ currentArg, previousArg }) => !(_.isEqual(currentArg, previousArg)),
        onCacheEntryAdded: async (
          { roomId },
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [MessageEvent.Send]: (message: MessageData) => {
              if (message.roomId === roomId) updateCachedData((draft) => {
                draft.items.push(message);

                return draft;
              });
            },
            [MessageEvent.Update]: (message: MessageData) => {
              if (message.roomId === roomId) updateCachedData((draft) => {
                const index = draft.items.findIndex(
                  msg => msg._id === message._id
                );

                if (index !== -1) {
                  draft.items[index] = {
                    ...draft.items[index],
                    ...message,
                  };
                }

                return draft;
              });
            },
            [MessageEvent.Delete]: (message: MessageData) => {
              if (message.roomId === roomId) updateCachedData((draft) => {
                draft.items = draft.items.filter(
                  msg => msg._id !== message._id
                );

                return draft;
              });
            }
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
      }),
      sendMessage: build.mutation<MessageData, SendMessageFields>({
        query: ({ serverId, roomId, body, emojis, attachments }) => ({
          url: messageBaseUrl({ serverId, roomId }),
          method: 'post',
          data: {
            body,
            emojis,
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
              { serverId, roomId, next: undefined },
              (draftMsgs) => {
                draftMsgs.items.push(message);

                return draftMsgs;
              }
            ));

            emitEvents({ [MessageEvent.Send]: message });
          } catch (err) {
            console.log(err);
          }
        },
      }),
      editMessage: build.mutation<MessageData, EditMessageFields>({
        query: ({ serverId, roomId, messageId, body, emojis }) => ({
          url: messageBaseUrl({ serverId, roomId, messageId }),
          method: 'put',
          data: { body, emojis },
        }),
        onQueryStarted: async ({ serverId, roomId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: message } = await queryFulfilled;

            dispatch(messageApi.util.updateQueryData(
              'getMessages',
              { serverId, roomId, next: undefined },
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

            emitEvents({ [MessageEvent.Update]: message });
          } catch (err) {
            console.log(err);
          }
        },
      }),
      deleteMessage: build.mutation<MessageData, DeleteMessageFields>({
        query: ({ serverId, roomId, messageId }) => ({
          url: messageBaseUrl({ serverId, roomId, messageId }),
          method: 'delete',
        }),
        onQueryStarted: async ({ serverId, roomId, messageId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;

            dispatch(messageApi.util.updateQueryData(
              'getMessages',
              { serverId, roomId, next: undefined },
              (draftMsgs) => {
                draftMsgs.items = draftMsgs.items.filter(
                  msg => msg._id !== messageId
                );

                return draftMsgs;
              }
            ));

            emitEvents({ [MessageEvent.Delete]: { _id: messageId, roomId } });
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
  useDeleteMessageMutation,
} = messageApi;