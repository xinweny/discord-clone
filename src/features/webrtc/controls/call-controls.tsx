import { TrackToggle, DisconnectButton } from '@livekit/components-react';
import { Track } from 'livekit-client';

export function CallControls() {
  return (
    <div>
      <TrackToggle source={Track.Source.Camera} />
      <TrackToggle source={Track.Source.ScreenShare} />
      <TrackToggle source={Track.Source.Microphone} />
      <DisconnectButton>
        <img src="" alt="Disconnect" />
      </DisconnectButton>
    </div>
  );
}