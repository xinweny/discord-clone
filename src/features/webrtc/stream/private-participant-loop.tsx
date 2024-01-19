import type { Participant } from 'livekit-client';
import { useHover } from '@uidotdev/usehooks';

import { useVideoMode } from '../hooks';

import { CallAvatar } from '.';
import { PrivateParticipantTile } from './private-participant-tile';

type PrivateParticipantLoopProps = {
  participants: Participant[];
  showDetails?: boolean;
};

export function PrivateParticipantLoop({
  participants,
  showDetails = true,
}: PrivateParticipantLoopProps) {
  const videoMode = useVideoMode();

  const [hoverRef, isHovered] = useHover();

  const localParticipant = participants.find(participant => participant.isLocal);
  const remoteParticipant = participants.find(participant => !participant.isLocal);

  return (
    <div ref={hoverRef}>
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
            showDetails={isHovered}
          />
        )
      }
    </div>
  );
}