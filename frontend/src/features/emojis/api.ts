import api from '@services/api';

import type {
  CustomEmojiData,
  GetEmojisQuery,
  CreateEmojiFields,
  EditEmojiFields,
  DeleteEmojiFields,
} from './types';

import { signAndUpload } from '@services/cloudinary';

const emojiApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getEmojis: build.query<CustomEmojiData[], GetEmojisQuery>({
        query: ({ serverIds, getCreators }) => ({
          url: `/emojis`,
          method: 'get',
          params: {
            serverIds,
            populate: getCreators,
          },
        }),
        providesTags: (...[, , { serverIds }]) => serverIds.map(serverId => ({ type: 'CustomEmojis', id: serverId })),
      }),
      createEmoji: build.mutation<CustomEmojiData, CreateEmojiFields>({
        query: ({ serverId, name, file }) => ({
          url: `/emojis`,
          method: 'post',
          data: {
            serverId,
            name,
            filename: file.name,
          },
        }),
        onQueryStarted: async ({ serverId, file }, { dispatch, queryFulfilled }) => {
          try {
            const { data: emoji } = await queryFulfilled;
            const emojiId = emoji._id;
            
            await signAndUpload(file, `/emojis/${emojiId}?serverId=${serverId}`, emojiId);
  
            dispatch(api.util.invalidateTags([
              { type: 'CustomEmojis', id: serverId },
            ]));
          } catch (err) {
            console.log(err);
          }
        },
      }),
      editEmoji: build.mutation<CustomEmojiData, EditEmojiFields>({
        query: ({ serverId, emojiId, name }) => ({
          url: `/emojis/${emojiId}`,
          method: 'put',
          data: {
            serverId,
            name
          },
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'CustomEmojis', id: serverId }],
      }),
      deleteEmoji: build.mutation<void, DeleteEmojiFields>({
        query: ({ serverId, emojiId }) => ({
          url: `/emojis/${emojiId}`,
          method: 'delete',
          data: { serverId }
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'CustomEmojis', id: serverId }],
      }),
    };  
  }
});

export default emojiApi;

export const {
  useGetEmojisQuery,
  useLazyGetEmojisQuery,
  useCreateEmojiMutation,
  useEditEmojiMutation,
  useDeleteEmojiMutation,
} = emojiApi;