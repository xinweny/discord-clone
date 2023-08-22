import api from '@services/api';

import type { RoleData, GetRolesQuery } from './types';

const roleApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerRoles: build.query<RoleData[], GetRolesQuery>({
        query: ({ serverId, withCount = false }) => ({
          url: `/servers/${serverId}/roles`,
          method: 'get',
          query: { withCount },
        }),
        providesTags: (...[, , { serverId }]) => [{ type: 'Roles', id: serverId }],
      }),
    };
  }
});

export default roleApi;

export const {
  useGetServerRolesQuery,
} = roleApi;