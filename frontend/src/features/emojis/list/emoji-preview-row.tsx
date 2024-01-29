import { useHover } from '@uidotdev/usehooks';

import type { CustomEmojiData } from '../types';

import { Emoji, Gif } from '@components/ui/media';

import { EditEmojiButton } from '../edit';
import { DeleteEmojiButton } from '../delete';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './emoji-preview-row.module.scss';

type EmojiPreviewRowProps = {
  emoji: CustomEmojiData;
};

export function EmojiPreviewRow({ emoji }: EmojiPreviewRowProps) {
  const [hoverRef, isHovered] = useHover();

  const { url, creator } = emoji;

  return (
    <tr className={styles.row} ref={hoverRef}>
      <td>
        <Emoji emoji={url} custom className={styles.emoji} />
      </td>
      <td className={styles.emojiName}>
        <EditEmojiButton emoji={emoji} />
      </td>
      <td>
        {creator && (
          <div className={styles.uploader}>
            <Gif src={creator.avatarUrl} className={styles.avatar} />
            <span>{creator.username}</span>
          </div>
        )}
      </td>
      <td>
        {isHovered && <DeleteEmojiButton emojiId={emoji._id} className={styles.deleteButton}>
          <CrossIcon />
        </DeleteEmojiButton>}
      </td>
    </tr>
  )
}