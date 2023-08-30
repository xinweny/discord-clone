import { useParams } from 'react-router-dom';

import { useGetReactionsQuery } from '../api';

import { AddToExistingReactionButton } from '../add';

type MessageReactionCountListProps = {
  messageId: string;
}

export function MessageReactionCountList({
  messageId
}: MessageReactionCountListProps) {
  const { serverId, channelId, roomId } = useParams();

  const { data: reactions, isSuccess } = useGetReactionsQuery({
    serverId: serverId!,
    roomId: (channelId || roomId)!,
    messageId,
  });

  if (!isSuccess || reactions.length === 0) return null;

  return (
    <div>
      {reactions.map(reaction => (
        <AddToExistingReactionButton
          key={reaction._id}
          reaction={reaction}
        />
      ))}
    </div>
  );
}