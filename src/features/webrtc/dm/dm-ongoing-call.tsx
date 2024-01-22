import { OngoingCallWrapper } from '../get';

import { DmOngoingCallParticipantCard } from './dm-ongoing-call-participant-card';
import { JoinOngoingCallControls } from './join-ongoing-call-controls';

import { useGetParticipantsQuery } from '../api';

type DmOngoingCallProps = {
  header: React.ReactNode;
  roomId: string;
  roomName: string;
};

export function DmOngoingCall({
  header,
  roomId,
  roomName,
}: DmOngoingCallProps) {
  const { data: participants } = useGetParticipantsQuery(roomId);

  return (
    <OngoingCallWrapper
      participants={participants}
      header={header}
      controls={<JoinOngoingCallControls
        roomId={roomId}
        roomName={roomName}
      />}
    >
      {participants && participants.map(participant => 
        <DmOngoingCallParticipantCard
          key={participant.identity}
          participant={participant}
        />
      )}
    </OngoingCallWrapper>
  );
}