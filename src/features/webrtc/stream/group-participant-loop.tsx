import type { Participant } from 'livekit-client';

import { useVideoMode } from '../hooks';

import { CallAvatar } from '.';

import { GroupParticipantTile } from './group-participant-tile';

import styles from './group-participant-loop.module.scss';

type GroupParticipantLoopProps = {
  participants: Participant[];
  serverId?: string;
  isFocused?: boolean;
};

export function GroupParticipantLoop({
  participants,
  serverId,
  isFocused = true,
}: GroupParticipantLoopProps) {
  const videoMode = useVideoMode();

  return (
    <div className={styles.loop}>
      {participants.map(participant => (!serverId && !videoMode
        ? <CallAvatar
          key={participant.identity}
          participant={participant}
        />
        : <GroupParticipantTile
          key={participant.identity}
          participant={participant}
          serverId={serverId}
          showDetails={isFocused}
        />
      ))}
    </div>
  );
}