import api from '@services/api';

import type { RoleData } from './types';

const roleApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerRoles: build.query<RoleData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/roles`,
          method: 'get',
        }),
        providesTags: (...[, , serverId]) => [{ type: 'Roles', id: serverId }],
      }),
    };
  }
});

export default roleApi;

export const {
  useGetServerRolesQuery,
} = roleApi;