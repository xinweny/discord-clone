import { useGetParticipantsQuery } from '../api';
import { ChannelOngoingCallParticipantCard } from './channel-ongoing-call-participant-card';

type ChannelOngoingCallProps = {
  roomId: string;
  serverId: string;
};

export function ChannelOngoingCall({
  roomId,
  serverId,
}: ChannelOngoingCallProps) {
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
