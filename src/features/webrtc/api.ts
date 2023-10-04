import api from '@services/api';

import { GetLivekitTokenFields } from './types';

const webRtcApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getLivekitToken: build.query<string, GetLivekitTokenFields>({
        query: ({ roomId }) => ({
          url: '/rtc/token',
          method: 'post',
          data: {
            roomId,
          },
        }),
        providesTags: ['WebRTC'],
      }),
    };
  }
});

export default webRtcApi;

export const {
  useLazyGetLivekitTokenQuery,
} = webRtcApi;