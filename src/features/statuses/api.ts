import api from '@services/api';

import { setupSocketEventListeners } from '@services/websocket';

import {
  type GetStatusEventPayload,
  StatusEvent,
  UserStatusesData,
} from './types';

const statusApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUserStatus: build.query<boolean, string>({
        query: (userId) => ({
          url: `/statuses/users/${userId}`,
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
      getUserStatuses: build.query<UserStatusesData, string[]>({
        query: (userIds) => ({
          url: '/statuses/users',
          method: 'get',
          params: { userIds },
        }),
        onCacheEntryAdded: async (
          userIds,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [StatusEvent.Get]: ({ status, userId: uid }: GetStatusEventPayload) => {
              if (!userIds.includes(uid)) return;

              updateCachedData(draft => {
                draft[uid] = status;

                return draft;
              });
            },
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
            userIds.map(id => `user_status#${id}`)
          );
        },
      }),
    };
  }
});

export default statusApi;

export const {
  useGetUserStatusQuery,
  useGetUserStatusesQuery,
} = statusApi;