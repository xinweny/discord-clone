import api from '@services/api';

const dmApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getDms: build.query<DmData[], string>({
        query: (dmId) => ({
          url: `/dms/${dmId}`,
          method: 'get',
        }),
        providesTags: ['DMs'],
      }),
    };
  }
});

export default dmApi;

export const {
  useGetDmsQuery,
} = dmApi;