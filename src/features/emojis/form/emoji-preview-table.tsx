import { useServerContext } from '@features/servers/context';

import { useGetEmojisQuery } from '../api';

import { EmojiPreviewRow } from './emoji-preview-row';

export function EmojiPreviewTable() {
  const { _id: serverId } = useServerContext()!;

  const emojis = useGetEmojisQuery({ serverId, getCreators: true });

  if (!emojis.isSuccess) return null;

  return (
    <table>
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