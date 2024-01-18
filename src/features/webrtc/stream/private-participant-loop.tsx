import type { Participant } from 'livekit-client';

import { useVideoMode } from '../hooks';

import { CallAvatar } from '.';

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
    <div>
      {!videoMode
        ? participants.map(participant => (
          <CallAvatar
            key={participant.identity}
            participant={participant}
          />
        ))
        : null
      }
    </div>
  );
}