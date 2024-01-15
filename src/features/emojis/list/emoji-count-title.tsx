import pluralize from 'pluralize';

import { useServerContext } from '@features/servers/context';

import { useGetEmojisQuery } from '../api';

export function EmojiCountTitle() {
  const { _id: serverId } = useServerContext()!;
  const emojis = useGetEmojisQuery({ serverId, getCreators: true });

  if (!emojis.isSuccess) return null;

  return (
    <h3>{`Emoji - ${pluralize('slot', 50 - emojis.data.length, true)} available`}</h3>
  );
}