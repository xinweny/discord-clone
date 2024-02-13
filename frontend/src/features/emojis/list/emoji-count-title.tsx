import pluralize from 'pluralize';

import { useServerContext } from '@features/servers/context';

import { useGetEmojisQuery } from '../api';

import styles from './emoji-count-title.module.scss';

export function EmojiCountTitle() {
  const { _id: serverId } = useServerContext()!;
  const emojis = useGetEmojisQuery({ serverIds: [serverId], getCreators: true });

  if (!emojis.isSuccess) return null;

  return (
    <h3 className={styles.header}>{`Emoji — ${pluralize('slot', 50 - emojis.data.length, true)} available`}</h3>
  );
}