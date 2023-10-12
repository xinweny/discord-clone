import api from '@services/api';

import type {
  DMData,
  CreateDMFields,
  EditDMFields,
} from './types';

import { signAndUpload } from '@services/cloudinary';

const dmApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getDms: build.query<DMData[], string>({
        query: (userId) => ({
          url: `/users/${userId}/dms`,
          method: 'get',
        }),
        providesTags: ['DMs'],
      }),
      getDm: build.query<DMData, string>({
        query: (dmId) => ({
          url: `/dms/${dmId}`,
          method: 'get',
        }),
        providesTags: (...[, , dmId]) => [{ type: 'DM', id: dmId }],
      }),
      createDm: build.mutation<DMData, CreateDMFields>({
        query: ({ participantIds }) => ({
          url: '/dms',
          method: 'post',
          data: { participantIds },
        }),
        invalidatesTags: ['DMs'],
      }),
      updateDm: build.mutation<DMData, EditDMFields>({
        query: ({ dmId, name }) => ({
          url: `/dms/${dmId}`,
          method: 'put',
          data: { name },
        }),
        onQueryStarted: async ({ avatar }, { dispatch, queryFulfilled }) => {
          try {
            if (avatar) {
              const { data: dm } = await queryFulfilled;

              const dmId = dm._id;
  
              await signAndUpload(avatar, `/avatars/groups/${dmId}`, dmId);
    
              dispatch(api.util.invalidateTags([
                'DMs',
                { type: 'DM', id: dmId },
              ]));
            }
          } catch (err) {
            console.log(err);
          }
        },
      }),
    };
  }
});

export default dmApi;

export const {
  useGetDmsQuery,
  useGetDmQuery,
  useLazyGetDmQuery,
  useCreateDmMutation,
  useUpdateDmMutation,
} = dmApi;