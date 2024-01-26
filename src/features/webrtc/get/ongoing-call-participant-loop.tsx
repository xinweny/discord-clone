import type { Participant } from 'livekit-client';

import { GroupOngoingCallParticipantCard } from './group-ongoing-call-participant-card';

import styles from './ongoing-call-participant-loop.module.scss';
import { PrivateOngoingCallParticipantCard } from './private-ongoing-call-participant-card';

type OngoingCallParticipantLoopProps = {
  participants: Participant[] | undefined;
  className?: string;
  isPrivate?: boolean;
};

export function OngoingCallParticipantLoop({
  participants,
  className,
  isPrivate = false,
}: OngoingCallParticipantLoopProps) {  
  const hasOngoingCall = participants && participants.length > 0;

  if (!hasOngoingCall) return null;

  return (
    <div
      className={`${styles.tiles} ${className || ''} ${isPrivate ? styles.private : ''}`}
    >
      {participants.map(participant => isPrivate
        ? <PrivateOngoingCallParticipantCard
          key={participant.identity}
          participant={participant}
        />
        : <GroupOngoingCallParticipantCard
          key={participant.identity}
          participant={participant}
        />
      )}
    </div>
    );
}