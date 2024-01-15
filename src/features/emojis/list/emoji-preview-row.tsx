import { useState } from 'react';

import type { CustomEmojiData } from '../types';

import { Emoji } from '@components/ui/media';

import { EditEmojiButton } from '../edit';
import { DeleteEmojiButton } from '../delete';

type EmojiPreviewRowProps = {
  emoji: CustomEmojiData;
};

export function EmojiPreviewRow({ emoji }: EmojiPreviewRowProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { url, creator } = emoji;

  return (
    <tr
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => { setIsHovered(false); }}
    >
      <td>
        <Emoji emoji={url} custom />
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
        <DeleteEmojiButton show={isHovered} emojiId={emoji._id} />
      </td>
    </tr>
  )
}