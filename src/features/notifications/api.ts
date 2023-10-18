import api from '@services/api';

import {
  type ReadStatusData,
  type ReadStatusDict,
  NotificationEvent,
} from './types';

import { setupSocketEventListeners } from '@services/websocket';

const notificationApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getReadStatuses: build.query<ReadStatusDict, string>({
        query: (userId) => ({
          url: `/users/${userId}/read`,
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
    };  
  }
});

export default notificationApi;

export const {
  useGetReadStatusesQuery,
} = notificationApi;