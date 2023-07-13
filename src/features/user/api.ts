import api from '../../services/api/root';

import type { UserSelfData } from '@features/user/types';

const userApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUserSelf: build.query<UserSelfData, string>({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: 'get',
        })
      }),
    };
  }
});

export default userApi;

export const {
  useGetUserSelfQuery,
} = userApi;