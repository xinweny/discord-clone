import type { Participant } from 'livekit-client';

import { useVideoMode } from '../hooks';

import { CallAvatar } from '.';

import { GroupParticipantTile } from './group-participant-tile';

type GroupParticipantLoopProps = {
  participants: Participant[];
  serverId?: string;
  showDetails?: boolean;
};

export function GroupParticipantLoop({
  participants,
  serverId,
  showDetails,
}: GroupParticipantLoopProps) {
  const videoMode = useVideoMode();

  return (
    <div>
      {participants.map(participant => (!serverId && !videoMode
        ? <CallAvatar
          key={participant.identity}
          participant={participant}
        />
        : <GroupParticipantTile
          key={participant.identity}
          participant={participant}
          serverId={serverId}
          showDetails={showDetails}
        />
      ))}
    </div>
  );
}