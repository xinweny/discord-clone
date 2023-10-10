import { useParams } from 'react-router-dom';
import { useParticipants, ParticipantLoop } from '@livekit/components-react';

import { ParticipantTile } from '../stream';
import { CallControls } from '../controls';


export function ChannelCall() {
  const { serverId } = useParams();

  const participants = useParticipants();

  return (
    <div>
      <ParticipantLoop participants={participants}>
        <ParticipantTile
          serverId={serverId}
        />
      </ParticipantLoop>
      <CallControls />
    </div>
  );
}