import { TrackToggle, DisconnectButton } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { useLivekitContext } from '../hooks';

export function CallControls() {
  const livekit = useLivekitContext();

  const { isMuted, setIsMuted } = { ...livekit };

  return (
    <div>
      <TrackToggle source={Track.Source.Camera} />
      <TrackToggle source={Track.Source.ScreenShare} />
      <TrackToggle
        source={Track.Source.Microphone}
        onChange={(enabled) => {
          if (setIsMuted) setIsMuted(!enabled);
        }}
        initialState={!isMuted}
      />
      <DisconnectButton>
        <img src="" alt="Disconnect" />
      </DisconnectButton>
    </div>
  );
}