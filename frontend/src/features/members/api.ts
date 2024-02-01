import api from '@services/api';

import type {
  ServerMemberData,
  ServerMemberMainData,
  GetUserServerMemberQuery,
  GetServerMemberQuery,
  DeleteServerMemberFields,
  EditServerMemberFields,
} from './types';
import { ServerMemberEvent } from './types';

import { setupSocketEventListeners, emitEvents } from '@services/websocket';

const memberApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerMembers: build.query<ServerMemberMainData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/members`,
          method: 'get',
        }),
        onCacheEntryAdded: async (
          serverId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
        ) => {
          const events = {
            [ServerMemberEvent.Join]: (member: ServerMemberData) => {
              if (member.serverId !== serverId) return;
              
              updateCachedData((draft) => {
                draft.push(member);

                return draft;
              });
            },
            [ServerMemberEvent.Update]: (member: ServerMemberData) => {
              if (member.serverId !== serverId) return;
              
              updateCachedData((draft) => {
                const index = draft.findIndex(m => m._id === member._id);

                if (index !== -1) draft[index] = member;

                return draft;
              });
            },
            [ServerMemberEvent.Leave]: (memberId: string) => {
              updateCachedData((draft) => {
                draft = draft.filter(member => member._id !== memberId);

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
      getUserServerMember: build.query<ServerMemberData, GetUserServerMemberQuery>({
        query: ({ userId, serverId }) => ({
          url: `/users/${userId}/servers/${serverId}/member`,
          method: 'get',
        }),
        providesTags: (...[, , { serverId }]) => [{ type: 'ServerMemberSelf', id: serverId }],
      }),
      getServerMember: build.query<ServerMemberData, GetServerMemberQuery>({
        query: ({ serverId, memberId }) => ({
          url: `/servers/${serverId}/members/${memberId}`,
          method: 'get',
        }),
        providesTags: (...[, , { memberId }]) => [{ type: 'ServerMember', id: memberId }],
      }),
      joinServer: build.mutation<ServerMemberData, string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/members`,
          method: 'post',
        }),
        onQueryStarted: async (args, { queryFulfilled }) => {
          const { data: member } = await queryFulfilled;

          emitEvents({ [ServerMemberEvent.Join]: member });
        },
        invalidatesTags: (...[, , serverId]) => [
          'JoinedServers',
          'MutualServers',
          { type: 'ServerMembers', id: serverId },
          { type: 'ServerMemberSelf', id: serverId },
        ],
      }),
      leaveServer: build.mutation<ServerMemberData, DeleteServerMemberFields>({
        query: ({ serverId, memberId }) => ({
          url: `/servers/${serverId}/members/${memberId}`,
          method: 'delete',
        }),
        onQueryStarted: async ({ serverId, memberId }, { queryFulfilled }) => {
          await queryFulfilled;

          emitEvents({ [ServerMemberEvent.Leave]: { serverId, memberId } });
        },
        invalidatesTags: (...[, , { serverId }]) => [
          'JoinedServers',
          'MutualServers',
          { type: 'ServerMembers', id: serverId },
          { type: 'ServerMemberSelf', id: serverId },
        ],
      }),
      updateServerMember: build.mutation<ServerMemberData, EditServerMemberFields>({
        query: ({ serverId, memberId, displayName, bio, bannerColor }) => ({
          url: `/servers/${serverId}/members/${memberId}`,
          method: 'put',
          data: {
            displayName,
            bio,
            bannerColor,
          },
        }),
        onQueryStarted: async (args, { queryFulfilled }) => {
          const { data: member } = await queryFulfilled;

          emitEvents({ [ServerMemberEvent.Join]: member });
        },
        invalidatesTags: (...[, , { serverId, memberId }]) => [
          { type: 'ServerMember', id: memberId },
          { type: 'ServerMemberSelf', id: serverId },
          { type: 'Messages', id: serverId },
        ],
      }),
    };
  }
});

export default memberApi;

export const {
  useGetServerMembersQuery,
  useGetUserServerMemberQuery,
  useGetServerMemberQuery,
  useLazyGetServerMemberQuery,
  useJoinServerMutation,
  useLeaveServerMutation,
  useUpdateServerMemberMutation,
} = memberApi;