import api from '@services/api';

import type {
  DMData,
  CreateDMFields,
} from './types';

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
        providesTags: ['DM'],
      }),
      createDm: build.mutation<DMData, CreateDMFields>({
        query: ({ participantIds }) => ({
          url: '/dms',
          method: 'post',
          data: { participantIds },
        }),
        invalidatesTags: ['DMs'],
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
} = dmApi;