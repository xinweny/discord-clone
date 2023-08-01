import api from '@services/api';

import { signAndUpload } from '@services/cloudinary';

import type { UserSelfData } from '@features/user/types';

type UpdateUserQuery = {
  userId: string;
  file?: File;
  username?: string;
  displayName?: string;
  bannerColor?: string;
  bio?: string;
}

const userApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUserSelf: build.query<UserSelfData, string>({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: 'get',
        }),
        providesTags: ['User'],
      }),
      updateUser: build.mutation<UserSelfData, UpdateUserQuery>({
        query: ({
          userId,
          file,
          displayName,
          username,
          bannerColor,
          bio,
        }) => ({
          url: `/users/${userId}`,
          method: 'put',
          data: {
            displayName,
            username,
            bannerColor,
            bio,
            filename: file?.name,
          },
        }),
        onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
          try {
            const { data: user } = await queryFulfilled;

            const userId = user.id;

            if (file) await signAndUpload(file, `/avatars/users/${userId}`, userId);
  
            dispatch(api.util.invalidateTags(['User']));
          } catch (err) {
            console.log(err);
          }
        },
      }),
    };
  }
});

export default userApi;

export const {
  useGetUserSelfQuery,
  useUpdateUserMutation,
} = userApi;