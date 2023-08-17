import pluralize from 'pluralize';

import { useContext } from 'react';

import { ServerContext } from '@features/server/context';

import { useGetEmojisQuery } from '../api';

export function EmojiCountTitle() {
  const { _id: serverId } = useContext(ServerContext)!;
  const emojis = useGetEmojisQuery({ serverId, getCreators: true });

  if (!emojis.isSuccess) return null;

  return (
    <h3>{`Emoji - ${pluralize('slot', 50 - emojis.data.length, true)} available`}</h3>
  );
}