import { useServerContext } from '@features/servers/context';

import { NullMessage } from '@components/ui/displays';

import { EmojiPreviewRow } from './emoji-preview-row';

import { useGetEmojisQuery } from '../api';

import emojisSrc from '@assets/static/emojis.svg';

import styles from './emoji-preview-table.module.scss';

export function EmojiPreviewTable() {
  const { _id: serverId } = useServerContext()!;

  const emojis = useGetEmojisQuery({ serverId, getCreators: true });

  if (!emojis.isSuccess) return null;
  
  return emojis.data.length === 0
    ? (
        <NullMessage
        src={emojisSrc}
        header="No Emoji"
        message="Get the party started by uploading an emoji!"
      />
    )
    : (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>UPLOADED BY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {emojis.data.map(emoji => (
            <EmojiPreviewRow key={emoji._id} emoji={emoji} />
          ))}
        </tbody>
      </table>
    );
}