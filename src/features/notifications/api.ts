import api from '@services/api';

import {
  type ReadStatusData,
  type ReadStatusDict,
  type UnreadCountData,
  type UnreadCountDict,
  NotificationEvent,
} from './types';

import { setupSocketEventListeners } from '@services/websocket';

const notificationApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getReadStatuses: build.query<ReadStatusDict, string>({
        query: (userId) => ({
          url: `/users/${userId}/notifications/read`,
          method: 'get',
        }),
        transformResponse: (response: ReadStatusData[]) => {
          const readStatuses = response.reduce((result, res) => {
            const { roomId, lastReadAt } = res;

            result[roomId] = lastReadAt;

            return result;
          }, {} as ReadStatusDict);

          return readStatuses;
        },
        onCacheEntryAdded: async (
          userId,
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
      getUnreadMessageCounts: build.query<UnreadCountDict, string>({
        query: (userId) => ({
          url: `/users/${userId}/notifications/unread`,
          method: 'get',
        }),
        transformResponse: (response: UnreadCountData[]) => {
          const unreadCounts = response.reduce((result, res) => {
            const { roomId, count } = res;

            result[roomId] = count;

            return result;
          }, {} as UnreadCountDict);

          return unreadCounts;
        },
        onCacheEntryAdded: async (
          userId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [NotificationEvent.NewUnreadMessage]: (unreadCount: UnreadCountData) => {
              updateCachedData((draft) => {
                const { roomId, count } = unreadCount;

                draft[roomId] = count;

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
    };  
  }
});

export default notificationApi;

export const {
  useGetReadStatusesQuery,
  useGetUnreadMessageCountsQuery,
} = notificationApi;