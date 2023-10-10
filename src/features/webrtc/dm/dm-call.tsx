import { useParticipants, ParticipantLoop } from '@livekit/components-react';

import { ParticipantTile } from '../stream';
import { CallControls } from '../controls';

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