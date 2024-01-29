import api from '@services/api';

import type {
  UserData,
  UserSelfData,
  UpdateUserFields,
  UpdateSensitiveFields,
} from '@features/users/types';

import { signAndUpload } from '@services/cloudinary';

const userApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUser: build.query<UserData | UserSelfData, string>({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: 'get',
        }),
        providesTags: (...[, , userId]) => [{ type: 'User', id: userId }],
      }),
      updateUser: build.mutation<UserSelfData, UpdateUserFields>({
        query: ({
          userId,
          file,
          displayName,
          username,
          bannerColor,
          bio,
          customStatus,
        }) => ({
          url: `/users/${userId}`,
          method: 'put',
          data: {
            displayName,
            username,
            bannerColor,
            bio,
            customStatus,
            filename: file?.name,
          },
        }),
        onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
          try {
            const { data: user } = await queryFulfilled;

            const userId = user.id;

            if (file) await signAndUpload(file, `/avatars/users/${userId}`, userId);
  
            dispatch(api.util.invalidateTags([{type: 'User', id: userId }]));
          } catch (err) {
            console.log(err);
          }
        },
        invalidatesTags: (...[, , { userId }]) => [{ type: 'User', id: userId }],
      }),
      updateSensitive: build.mutation<UserSelfData, UpdateSensitiveFields>({
        query: ({ userId, currentPassword, password, username }) => ({
          url: `/users/${userId}`,
          params: { sensitive: true },
          method: 'put',
          data: {
            currentPassword,
            username,
            password,
          },
        }),
        invalidatesTags: (...[, , { userId }]) => [{ type: 'User', id: userId }],
      }),
    };
  }
});

export default userApi;

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateSensitiveMutation,
} = userApi;