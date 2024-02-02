import api from '@services/api';

import {
  type ReadStatusData,
  type TimestampDict,
  type LastTimestampData,
  NotificationEvent,
  GetLastTimestampsQuery,
} from './types';
import {
  type MessageData,
  MessageEvent,
} from '@features/messages/types';

import { setupSocketEventListeners } from '@services/websocket';

import newMessageAudio from '@assets/audio/new-message.mp3';

const notificationApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getReadStatuses: build.query<TimestampDict, string>({
        query: (userId) => ({
          url: `/users/${userId}/notifications/read`,
          method: 'get',
        }),
        transformResponse: (response: ReadStatusData[]) => {
          const readStatuses = response.reduce((result, res) => {
            const { roomId, lastReadAt } = res;

            result[roomId] = lastReadAt;

            return result;
          }, {} as TimestampDict);

          return readStatuses;
        },
        onCacheEntryAdded: async (
          _,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [NotificationEvent.UpdateReadStatus]: (readStatus: ReadStatusData) => {
              updateCachedData((draft) => {
                const { roomId, lastReadAt } = readStatus;

                draft[roomId] = lastReadAt;

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
      getLastTimestamps: build.query<TimestampDict, GetLastTimestampsQuery>({
        query: ({ userId, type }) => ({
          url: `/users/${userId}/notifications/unread`,
          params: { type },
          method: 'get',
        }),
        transformResponse: (response: LastTimestampData[]) => {
          const unreadCounts = response.reduce((result, res) => {
            const { roomId, lastAt } = res;

            result[roomId] = lastAt;

            return result;
          }, {} as TimestampDict);

          return unreadCounts;
        },
        onCacheEntryAdded: async (
          { type },
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [MessageEvent.Send]: (message: MessageData) => {
              if (message.type !== type) return;

              updateCachedData((draft) => {
                const { roomId, createdAt } = message;
                draft[roomId] = createdAt;

                return draft;
              });

              new Audio(newMessageAudio).play();
            }
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
      }),
    };  
  }
});

export default notificationApi;

export const {
  useGetReadStatusesQuery,
  useGetLastTimestampsQuery,
} = notificationApi;