import { useParams } from 'react-router-dom';
import { useTracks, TrackLoop } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { CallParticipantTrack } from '../stream';
import { CallControls } from '../controls';


export function ChannelCall() {
  const { serverId } = useParams();

  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);

  return (
    <div>
      <TrackLoop tracks={tracks}>
        <CallParticipantTrack
          serverId={serverId}
        />
      </TrackLoop>
      <CallControls />
    </div>
  );
}