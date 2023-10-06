import { useGetParticipantsQuery } from '../api';
import { ChannelOngoingCallParticipantCardPreview } from './channel-ongoing-call-participant-card-preview';

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
        <ChannelOngoingCallParticipantCardPreview
          key={participant.identity}
          participant={participant}
          serverId={serverId}
        />
      )}
    </div>
  );
}
