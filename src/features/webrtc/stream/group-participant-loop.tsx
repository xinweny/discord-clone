import type { Participant } from 'livekit-client';
import { useHover } from '@uidotdev/usehooks';

import { useVideoMode } from '../hooks';

import { CallAvatar } from '.';

import { GroupParticipantTile } from './group-participant-tile';

type GroupParticipantLoopProps = {
  participants: Participant[];
  serverId?: string;
};

export function GroupParticipantLoop({
  participants,
  serverId,
}: GroupParticipantLoopProps) {
  const videoMode = useVideoMode();

  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      {participants.map(participant => (!serverId && !videoMode
        ? <CallAvatar
          key={participant.identity}
          participant={participant}
        />
        : <GroupParticipantTile
          key={participant.identity}
          participant={participant}
          serverId={serverId}
          showDetails={isHovered}
        />
      ))}
    </div>
  );
}