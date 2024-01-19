import type { Participant } from 'livekit-client';

import { useVideoMode } from '../hooks';

import { CallAvatar } from '.';
import { PrivateParticipantTile } from './private-participant-tile';

import styles from './private-participant-loop.module.scss';

type PrivateParticipantLoopProps = {
  participants: Participant[];
  showDetails?: boolean;
};

export function PrivateParticipantLoop({
  participants,
  showDetails = true,
}: PrivateParticipantLoopProps) {
  const videoMode = useVideoMode();

  const localParticipant = participants.find(participant => participant.isLocal);
  const remoteParticipant = participants.find(participant => !participant.isLocal);

  return (
    <div className={styles.container}>
      {!videoMode
        ? participants.map(participant => (
          <CallAvatar
            key={participant.identity}
            participant={participant}
          />
        ))
        : (
          <PrivateParticipantTile
            localParticipant={localParticipant}
            remoteParticipant={remoteParticipant}
            showDetails={showDetails}
          />
        )
      }
    </div>
  );
}