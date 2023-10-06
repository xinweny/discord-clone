import { useGetParticipantsQuery } from '../api';
import { ChannelOngoingCallParticipantCard } from './channel-ongoing-call-participant-card';

type ChannelOngoingCallPreviewProps = {
  roomId: string;
  serverId: string;
};

export function ChannelOngoingCallPreview({
  roomId,
  serverId,
}: ChannelOngoingCallPreviewProps) {
  const { data: participants, isSuccess } = useGetParticipantsQuery(roomId);

  if (!isSuccess || participants.length === 0) return null;

  return (
    <div>
      {participants.map(participant =>
        <ChannelOngoingCallParticipantCard
          key={participant.identity}
          participant={participant}
          serverId={serverId}
        />
      )}
    </div>
  );
}
