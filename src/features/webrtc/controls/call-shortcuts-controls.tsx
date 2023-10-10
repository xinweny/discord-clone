import { TrackToggle } from '@livekit/components-react';
import { Track } from 'livekit-client';

export function CallShortcutsControls() {
  return (
    <div>
      <TrackToggle source={Track.Source.Camera} />
      <TrackToggle source={Track.Source.ScreenShare} />
    </div>
  );
}