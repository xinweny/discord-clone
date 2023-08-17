import type { CustomEmojiData } from '../types';

import { Emoji } from '@components/ui/media';

import { EditEmojiButton } from '../edit';

type EmojiPreviewRowProps = {
  emoji: CustomEmojiData;
};

export function EmojiPreviewRow({ emoji }: EmojiPreviewRowProps) {
  const { url, creator } = emoji;

  return (
    <tr>
      <td>
        <Emoji src={url} />
      </td>
      <td>
        <EditEmojiButton emoji={emoji} />
      </td>
      <td>
        {creator && (
          <div>
            <img src={creator.avatarUrl} />
            <p>{creator.username}</p>
          </div>
        )}
      </td>
      <td>
        <button>x</button>
      </td>
    </tr>
  )
}