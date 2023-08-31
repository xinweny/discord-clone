import { useGetServerRoomIds } from '@hooks';

import { ToggleReactionButton } from '../edit';

import { useGetReactionsQuery } from '../api';

type MessageReactionsListProps = {
  messageId: string;
};

export function MessageReactionsList({
  messageId
}: MessageReactionsListProps) {
  const { serverId, roomId } = useGetServerRoomIds();

  const { data: reactions, isSuccess } = useGetReactionsQuery({
    serverId: serverId!,
    roomId: roomId!,
    messageId,
  });

  if (!isSuccess || reactions.length === 0) return null;

  return (
    <div>
      {reactions.map(reaction => (
        <ToggleReactionButton
          key={reaction._id}
          reaction={reaction}
          serverId={serverId}
          roomId={roomId!}
        />
      ))}
    </div>
  );
}