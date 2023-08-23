import api from '@services/api';

import {
  MemberRoleData,
  GetMemberRolesQuery,
  AddMemberRoleField,
} from './types';

const memberRoleApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getMemberRoles: build.query<MemberRoleData[], GetMemberRolesQuery>({
        query: ({ serverId, memberId }) => ({
          url: `/servers/${serverId}/members/${memberId}/roles`,
          method: 'get',
        }),
        providesTags: (...[, , { memberId }]) => [{ type: 'MemberRoles', id: memberId }],
      }),
      addMemberRole: build.mutation<MemberRoleData[], AddMemberRoleField>({
        query: ({ serverId, memberId, roleId }) => ({
          url: `/servers/${serverId}/members/${memberId}/roles`,
          method: 'post',
          data: { roleId },
        }),
        invalidatesTags: (...[, , { memberId }]) => [
          { type: 'MemberRoles', id: memberId },
          { type: 'ServerMember', id: memberId },
        ],
      }),
    };
  }
});

export default memberRoleApi;

export const {
  useGetMemberRolesQuery,
  useAddMemberRoleMutation,
} = memberRoleApi;