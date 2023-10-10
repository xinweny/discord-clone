import { TrackToggle } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { useLivekitContext } from '../hooks';

export function ToggleMuteButton() {
  const livekit = useLivekitContext();

  if (!livekit) return null;

  const {
    isMuted,
    setIsMuted,
    isOnCall,
  } = livekit;

  return isOnCall
    ? <TrackToggle
      source={Track.Source.Microphone}
      onChange={(enabled) => {
        if (setIsMuted) setIsMuted(!enabled);
      }}
      initialState={!isMuted}
    />
    : <button
      type="button"
      onClick={() => { setIsMuted(muted => !muted); }}
    >
      {isMuted
        ? <img src="" alt="Muted" />
        : <img src="" alt="Unmuted" />
      }
    </button>;
}