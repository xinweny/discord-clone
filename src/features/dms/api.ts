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
  useCreateDmMutation,
} = dmApi;