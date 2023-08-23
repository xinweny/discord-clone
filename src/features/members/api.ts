import api from '@services/api';

import type {
  ServerMemberData,
  ServerMemberMainData,
  GetUserServerMemberQuery,
  GetServerMemberQuery,
} from './types';

const memberApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerMembers: build.query<ServerMemberMainData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/members`,
          method: 'get',
        }),
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
    };
  }
});

export default memberApi;

export const {
  useGetServerMembersQuery,
  useGetUserServerMemberQuery,
  useGetServerMemberQuery,
} = memberApi;