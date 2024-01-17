import { useParams } from 'react-router-dom';
import { useParticipants, ParticipantLoop } from '@livekit/components-react';

import { CallControls } from '../stream';
import { ChannelParticipantTile } from './channel-participant-tile';

export function ChannelCall() {
  const { serverId } = useParams();

  const participants = useParticipants();

  return (
    <div>
      <ParticipantLoop participants={participants}>
        <ChannelParticipantTile
          serverId={serverId!}
        />
      </ParticipantLoop>
      <CallControls />
    </div>
  );
}