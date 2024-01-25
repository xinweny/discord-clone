import api from '@services/api';

import { setupSocketEventListeners } from '@services/websocket';

import {
  type GetStatusEventPayload,
  StatusEvent,
} from './types';

const statusApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUserStatus: build.query<boolean, string>({
        query: (userId) => ({
          url: `/users/${userId}/status`,
          method: 'get',
        }),
        onCacheEntryAdded: async (
          userId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [StatusEvent.Get]: ({ status, userId: uid }: GetStatusEventPayload) => {
              if (userId !== uid) return;

              updateCachedData(() => status);
            },
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
            `user_status#${userId}`
          );
        },
      }),
    };
  }
});

export default statusApi;

export const {
  useGetUserStatusQuery,
} = statusApi;