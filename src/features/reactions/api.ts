import api from '@services/api';

import {
  ReactionCountData,
  GetReactionCountsQuery,
} from './types';

import { messageBaseUrl } from '@utils';

const reactionApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getReactionCounts: build.query<ReactionCountData[], GetReactionCountsQuery>({
        query: ({ serverId, roomId, messageId }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions/counts`,
          method: 'get',
        }),
        providesTags: (...[, , { messageId }]) => [{ type: 'ReactionCounts', id: messageId }],
      }),
    };
  }
});

export default reactionApi;

export const {
  useGetReactionCountsQuery,
} = reactionApi;