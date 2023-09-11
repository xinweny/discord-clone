import api from '@services/api';

import type {
  ServerMemberData,
  ServerMemberMainData,
  GetUserServerMemberQuery,
  GetServerMemberQuery,
  DeleteServerMemberFields,
} from './types';

const memberApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerMembers: build.query<ServerMemberMainData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/members`,
          method: 'get',
        }),
        providesTags: (...[, , serverId]) => [{ type: 'ServerMembers', id: serverId }],
      }),
      getUserServerMember: build.query<ServerMemberData, GetUserServerMemberQuery>({
        query: ({ userId, serverId }) => ({
          url: `/users/${userId}/servers/${serverId}/member`,
          method: 'get',
        }),
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
        invalidatesTags: (...[, , serverId]) => [
          'JoinedServers',
          'MutualServers',
          { type: 'ServerMembers', id: serverId },
        ],
      }),
      leaveServer: build.mutation<ServerMemberData, DeleteServerMemberFields>({
        query: ({ serverId, memberId }) => ({
          url: `/servers/${serverId}/members/${memberId}`,
          method: 'delete',
        }),
        invalidatesTags: (...[, , { serverId }]) => [
          'JoinedServers',
          'MutualServers',
          { type: 'ServerMembers', id: serverId },
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
  useJoinServerMutation,
  useLeaveServerMutation,
} = memberApi;