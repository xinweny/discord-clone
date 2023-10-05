import { ConnectToRoomButton } from '../connect';

import { useGetParticipantsQuery } from '../api';
import { OngoingCallParticipantCard } from './ongoing-call-participant-card';

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
          <OngoingCallParticipantCard
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