import { useParticipants, ParticipantLoop } from '@livekit/components-react';

import { ParticipantTile, CallControls } from '../stream';

export function DmCall() {
  const participants = useParticipants();

  return (
    <div>
      <ParticipantLoop participants={participants}>
        <ParticipantTile />
      </ParticipantLoop>
      <CallControls />
    </div>
  );
}