import { useParams } from 'react-router-dom';

import { useGetReactionCountsQuery } from '../api';

import { AddToExistingReactionButton } from '../add';

type MessageReactionCountListProps = {
  messageId: string;
}

export function MessageReactionCountList({
  messageId
}: MessageReactionCountListProps) {
  const { serverId, channelId, roomId } = useParams();

  const { data: counts, isSuccess } = useGetReactionCountsQuery({
    serverId: serverId!,
    roomId: (channelId || roomId)!,
    messageId,
  });

  if (!isSuccess || counts.length === 0) return null;

  return (
    <div>
      {counts.map(count => (
        <AddToExistingReactionButton
          key={count._id}
          reactionCount={count}
        />
      ))}
    </div>
  );
}