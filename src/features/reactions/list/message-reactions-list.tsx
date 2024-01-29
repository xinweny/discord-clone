import { useGetServerRoomIds } from '@hooks';

import { ToggleReactionButton } from '../edit';

import { useGetReactionsQuery } from '../api';

import styles from './message-reactions-list.module.scss';

type MessageReactionsListProps = {
  messageId: string;
  authorized: boolean;
};

export function MessageReactionsList({
  messageId,
  authorized,
}: MessageReactionsListProps) {
  const { serverId, roomId } = useGetServerRoomIds();

  const { data: reactions, isSuccess } = useGetReactionsQuery({
    serverId: serverId!,
    roomId: roomId!,
    messageId,
  });

  if (!isSuccess || reactions.length === 0) return null;

  return (
    <div className={styles.list}>
      {reactions.map(reaction => (
        <ToggleReactionButton
          key={reaction._id}
          reaction={reaction}
          serverId={serverId}
          roomId={roomId!}
          authorized={authorized}
        />
      ))}
    </div>
  );
}