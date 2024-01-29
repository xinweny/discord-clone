import api from '@services/api';

import {
  MemberRoleData,
  GetMemberRolesQuery,
  AddMemberRoleField,
  RemoveMemberRoleField,
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
      removeMemberRole: build.mutation<MemberRoleData[], RemoveMemberRoleField>({
        query: ({ serverId, memberId, roleId }) => ({
          url: `/servers/${serverId}/members/${memberId}/roles/${roleId}`,
          method: 'delete',
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
  useRemoveMemberRoleMutation,
} = memberRoleApi;