import type { LocalParticipant, RemoteParticipant } from 'livekit-client';

import { useVideoMode } from '../hooks';

import { CallAvatar } from '.';

import styles from './private-participant-loop.module.scss';

type PrivateParticipantLoopProps = {
  localParticipant: LocalParticipant;
  remoteParticipant: RemoteParticipant;
};

export function GroupParticipantLoop({
  localParticipant,
  remoteParticipant,
}: PrivateParticipantLoopProps) {
  const participants = [localParticipant, remoteParticipant];
  const videoMode = useVideoMode();

  if (!videoMode) return (
    <div className={styles.noVideoLoop}>
      {participants.map(participant => (
        <CallAvatar
          key={participant.identity}
          participant={participant}
        />
      ))}
    </div>
  );

  

  return (
    <>
      <div className={styles.videoLoop}>
        {remoteParticipant.isCameraEnabled || remoteParticipant.isScreenShareEnabled
          ?
          : 
        }
      </div>
    </>

  );
}