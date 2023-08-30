import api from '@services/api';

import {
  ReactionData,
  GetReactionCountsQuery,
  CreateReactionsFields,
  IncrementReactionFields,
  DecrementReactionFields,
} from './types';

import { messageBaseUrl } from '@utils';

const reactionApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getReactions: build.query<ReactionData[], GetReactionCountsQuery>({
        query: ({ serverId, roomId, messageId }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions`,
          method: 'get',
        }),
        providesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
      }),
      createReaction: build.mutation<ReactionData, CreateReactionsFields>({
        query: ({ serverId, roomId, messageId, emoji }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions`,
          method: 'post',
          data: emoji,
        }),
        invalidatesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
      }),
      incrementReaction: build.mutation<ReactionData, IncrementReactionFields>({
        query: ({ serverId, roomId, messageId, reactionId }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions`,
          method: 'put',
          params: { reactionId },
        }),
        invalidatesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
      }),
      decrementReaction: build.mutation<ReactionData, DecrementReactionFields>({
        query: ({ serverId, roomId, messageId, reactionId }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions`,
          method: 'put',
          params: { reactionId },
        }),
        invalidatesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
      }),
    };
  }
});

export default reactionApi;

export const {
  useGetReactionsQuery,
  useCreateReactionMutation,
  useIncrementReactionMutation,
  useDecrementReactionMutation,
} = reactionApi;