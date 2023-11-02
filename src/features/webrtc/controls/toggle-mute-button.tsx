import { TrackToggle } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { useLivekitContext } from '../hooks';

import { Tooltip } from '@components/ui/popups';

import UnmutedIcon from '@assets/icons/microphone.svg?react';
import MutedIcon from '@assets/icons/microphone-mute.svg?react';

import styles from './toggle-mute-button.module.scss';

export function ToggleMuteButton() {
  const livekit = useLivekitContext();

  if (!livekit) return null;

  const {
    isMuted,
    setIsMuted,
    isOnCall,
  } = livekit;

  return (
    <Tooltip
      text={isMuted ? 'Unmute' : 'Mute'}
      direction="top"
      options={{ gap: '4px' }}
    >
      {isOnCall
      ? <TrackToggle
        source={Track.Source.Microphone}
        onChange={(enabled) => {
          if (setIsMuted) setIsMuted(!enabled);
        }}
        initialState={!isMuted}
      />
      : <button
        className={`${styles.button} ${isMuted ? styles.muted : styles.unmuted}`}
        type="button"
        onClick={() => { setIsMuted(muted => !muted); }}
      >
        {isMuted
          ? <MutedIcon />
          : <UnmutedIcon />
        }
      </button>
      }
    </Tooltip>
  );
}