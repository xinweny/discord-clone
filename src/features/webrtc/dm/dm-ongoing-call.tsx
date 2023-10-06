import { ConnectToRoomButton } from '../connect';
import { DmOngoingCallParticipantCard } from './dm-ongoing-call-participant-card';

import { useGetParticipantsQuery } from '../api';

type DmOngoingCallProps = {
  roomId: string;
  roomName: string;
};

export function DmOngoingCall({
  roomId,
  roomName,
}: DmOngoingCallProps) {
  const { data: participants, isSuccess } = useGetParticipantsQuery(roomId);

  if (!isSuccess || participants.length === 0) return null;

  return (
    <div>
      <div>
        {participants.map(participant => 
          <DmOngoingCallParticipantCard
            key={participant.identity}
            participant={participant}
          />
        )}
      </div>
      <ConnectToRoomButton
        roomId={roomId}
        roomName={roomName}
      >
        <img src="" alt="Join Call" />
      </ConnectToRoomButton>
    </div>
  );
}