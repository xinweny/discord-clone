import api from '@services/api';

export type ServerMemberData = {
  _id: string;
  userId: string;
  serverId: string;
  displayName: string;
  roleIds: string[];
  bio: string;
  bannerColor: string;
  user: {
    avatarUrl: string;
  };
};

type UserServerMemberQuery = {
  userId: string;
  serverId: string;
};

const memberApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerMembers: build.query<ServerMemberData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/members`,
          method: 'get',
        }),
      }),
      getUserServerMember: build.query<ServerMemberData, UserServerMemberQuery>({
        query: ({ userId, serverId }) => ({
          url: `/users/${userId}/servers/${serverId}/member`,
          method: 'get',
        }),
      }),
    };
  }
});

export default memberApi;

export const {
  useGetServerMembersQuery,
  useGetUserServerMemberQuery,
} = memberApi;