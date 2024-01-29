import { Participant } from 'livekit-client';

import { OngoingCallParticipantLoop, OngoingCallWrapper } from '../get';

import { CallResizerWrapper } from './call-resizer-wrapper';
import { JoinOngoingCallControls } from './join-ongoing-call-controls';

type DmOngoingCallProps = {
  header: React.ReactNode;
  participants: Participant[];
  roomId: string;
  roomName: string;
  isGroup: boolean;
};

export function DmOngoingCall({
  header,
  participants,
  roomId,
  roomName,
  isGroup,
}: DmOngoingCallProps) {
  return (
    <CallResizerWrapper style={{ flexGrow: 1 }}>
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
    </CallResizerWrapper>
  );
}