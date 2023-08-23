import api from '@services/api';

import type {
  RoleData,
  GetRolesQuery,
  EditRoleFields,
  DeleteRoleFields,
} from './types';

const roleApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getRoles: build.query<RoleData[], GetRolesQuery>({
        query: ({ serverId, withCount = false }) => ({
          url: `/servers/${serverId}/roles`,
          method: 'get',
          params: { withCount },
        }),
        providesTags: (...[, , { serverId }]) => [{ type: 'Roles', id: serverId }],
      }),
      createRole: build.mutation<RoleData, string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/roles`,
          method: 'post',
          data: {
            name: 'new role',
            color: '#99AAB5',
          },
        }),
        invalidatesTags: (...[, , serverId]) => [{ type: 'Roles', id: serverId }],
      }),
      editRole: build.mutation<RoleData, EditRoleFields>({
        query: ({ serverId, roleId, name, color, permissions }) => ({
          url: `/servers/${serverId}/roles/${roleId}`,
          method: 'put',
          data: {
            name,
            color,
            permissions,
          },
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Roles', id: serverId }],
      }),
      deleteRole: build.mutation<RoleData, DeleteRoleFields>({
        query: ({ serverId, roleId }) => ({
          url: `/servers/${serverId}/roles/${roleId}`,
          method: 'delete',
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Roles', id: serverId }],
      }),
    };
  }
});

export default roleApi;

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
} = roleApi;