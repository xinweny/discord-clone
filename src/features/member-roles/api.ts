import api from '@services/api';

import {
  MemberRoleData,
  GetMemberRolesQuery,
} from './types';

const memberRoleApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getMemberRoles: build.query<MemberRoleData[], GetMemberRolesQuery>({
        query: ({ serverId, memberId }) => ({
          url: `/servers/${serverId}/members/${memberId}/roles`,
          method: 'get',
        }),
      }),
    };
  }
});

export default memberRoleApi;

export const {
  useGetMemberRolesQuery,
} = memberRoleApi;