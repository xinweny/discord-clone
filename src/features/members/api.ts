import api from '@services/api';

import type {
  ServerMemberData,
  ServerMemberMainData,
  GetUserServerMemberQuery,
  GetServerMemberQuery,
  DeleteServerMemberFields,
  EditServerMemberFields,
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