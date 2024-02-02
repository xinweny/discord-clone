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
      getFriendStatuses: build.query<UserStatusesData, string>({
        query: (userId) => ({
          url: `/statuses/users/${userId}/friends`,
          method: 'get',
        }),
        onCacheEntryAdded: async (
          _,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const userIds = Object.keys((await cacheDataLoaded).data);

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
          );
        },
        providesTags: (...[, , userId]) => [{ type: 'Relations', id: userId }],
      }),
      getServerMemberStatuses: build.query<UserStatusesData, string>({
        query: (serverId) => ({
          url: `/statuses/servers/${serverId}/members`,
          method: 'get',
        }),
        onCacheEntryAdded: async (
          _,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [StatusEvent.Get]: ({ status, userId }: GetStatusEventPayload) => {
              updateCachedData((draft) => {
                if (Object.keys(draft).includes(userId)) draft[userId] = status;

                return draft;
              });
            },
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
        providesTags: (...[, , serverId]) => [{ type: 'ServerMembers', id: serverId }],
      }),
    };
  }
});

export default statusApi;

export const {
  useGetUserStatusQuery,
  useGetFriendStatusesQuery,
  useGetServerMemberStatusesQuery,
} = statusApi;