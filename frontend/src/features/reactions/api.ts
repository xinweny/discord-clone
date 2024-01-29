import api from '@services/api';

import type {
  ReactionData,
  GetReactionCountsQuery,
  CreateReactionsFields,
  IncrementReactionFields,
  DecrementReactionFields,
} from './types';
import { ReactionEvent } from './types';

import { messageBaseUrl } from '@utils';

import { setupSocketEventListeners, emitEvents } from '@services/websocket';

const reactionApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getReactions: build.query<ReactionData[], GetReactionCountsQuery>({
        query: ({ serverId, roomId, messageId }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions`,
          method: 'get',
        }),
        providesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
        onCacheEntryAdded: async (
          args,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [ReactionEvent.Create]: (reaction: ReactionData) => {
              updateCachedData((draft) => {
                draft.push(reaction);

                return draft;
              });
            },
            [ReactionEvent.Increment]: (reaction: ReactionData) => {
              updateCachedData((draft) => {
                const i = draft.findIndex(r => r._id === reaction._id);

                if (i === -1) return draft;

                draft[i].count = reaction.count;

                return draft;
              });
            },
            [ReactionEvent.Decrement]: (reaction: ReactionData) => {
              updateCachedData((draft) => {
                const i = draft.findIndex(r => r._id === reaction._id);

                if (i === -1) return draft;

                reaction.count === 0
                  ? draft.splice(i, 1)
                  : draft[i].count = reaction.count;

                return draft;
              });
            }
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
      }),
      createReaction: build.mutation<ReactionData, CreateReactionsFields>({
        query: ({ serverId, roomId, messageId, emoji }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions`,
          method: 'post',
          data: emoji,
        }),
        invalidatesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
        onQueryStarted: async ({ roomId }, { queryFulfilled }) => {
          try {
            const { data: reaction } = await queryFulfilled;

            emitEvents({ [ReactionEvent.Create]: { reaction, roomId } });
          } catch (err) {
            console.log(err);
          }
        },
      }),
      incrementReaction: build.mutation<ReactionData, IncrementReactionFields>({
        query: ({ serverId, roomId, messageId, reactionId }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions/${reactionId}`,
          method: 'put',
        }),
        invalidatesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
        onQueryStarted: async ({ roomId }, { queryFulfilled }) => {
          try {
            const { data: reaction } = await queryFulfilled;

            emitEvents({ [ReactionEvent.Increment]: { reaction, roomId } });
          } catch (err) {
            console.log(err);
          }
        },
      }),
      decrementReaction: build.mutation<ReactionData, DecrementReactionFields>({
        query: ({ serverId, roomId, messageId, reactionId }) => ({
          url: `${messageBaseUrl({ serverId, roomId, messageId })}/reactions/${reactionId}`,
          method: 'delete',
          params: { reactionId },
        }),
        invalidatesTags: (...[, , { messageId }]) => [{ type: 'Reactions', id: messageId }],
        onQueryStarted: async ({ roomId }, { queryFulfilled }) => {
          try {
            const { data: reaction } = await queryFulfilled;
            
            emitEvents({ [ReactionEvent.Decrement]: { reaction, roomId } });
          } catch (err) {
            console.log(err);
          }
        },
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