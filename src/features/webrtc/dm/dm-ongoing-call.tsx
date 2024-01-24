import { OngoingCallParticipantLoop, OngoingCallWrapper } from '../get';

import { JoinOngoingCallControls } from './join-ongoing-call-controls';

import { useGetParticipantsQuery } from '../api';

type DmOngoingCallProps = {
  header: React.ReactNode;
  roomId: string;
  roomName: string;
  isGroup: boolean;
};

export function DmOngoingCall({
  header,
  roomId,
  roomName,
  isGroup,
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
      <OngoingCallParticipantLoop
        participants={participants}
        isPrivate={!isGroup}
      />
    </OngoingCallWrapper>
  );
}