import api from '@services/api';

import type { RolePermissionsData } from '@types';

export type RoleData = {
  _id: string;
  name: string;
  color: string;
  permissions: RolePermissionsData;
};

const roleApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getServerRoles: build.query<RoleData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/roles`,
          method: 'get',
        }),
      }),
    };
  }
});

export default roleApi;

export const {
  useGetServerRolesQuery,
} = roleApi;