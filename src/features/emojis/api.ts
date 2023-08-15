import api from '@services/api';

import type {
  EmojiData,
  CreateEmojiFields,
} from './types';

import { signAndUpload } from '@services/cloudinary';

const emojiApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getEmojis: build.query<EmojiData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/emojis`,
          method: 'get',
        }),
        providesTags: (...[, , serverId]) => [{ type: 'CustomEmojis', id: serverId }],
      }),
      createEmoji: build.mutation<EmojiData, CreateEmojiFields>({
        query: ({ serverId, name, file }) => ({
          url: `/servers/${serverId}/emojis`,
          method: 'post',
          data: {
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
    };  
  }
});

export default emojiApi;

export const {
  useGetEmojisQuery,
  useCreateEmojiMutation,
} = emojiApi;