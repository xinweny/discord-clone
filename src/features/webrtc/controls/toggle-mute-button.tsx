import { TrackToggle } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { useLivekitContext } from '../hooks';

import { Tooltip } from '@components/ui/popups';

import UnmutedIcon from '@assets/icons/microphone.svg?react';
import MutedIcon from '@assets/icons/microphone-mute.svg?react';

import styles from './toggle-mute-button.module.scss';

type ToggleMuteButtonProps = {
  className?: string;
  activeClassName?: string;
};

export function ToggleMuteButton({ className, activeClassName }: ToggleMuteButtonProps) {
  const livekit = useLivekitContext();

  if (!livekit) return null;

  const {
    isMuted,
    setIsMuted,
    isOnCall,
  } = livekit;

  const classes = `${className} ${styles.button} ${isMuted ? `${activeClassName} ${styles.muted}` : styles.unmuted}`;

  const icon = isMuted ? <MutedIcon /> : <UnmutedIcon />;

  return (
    <Tooltip
      text={isMuted ? 'Unmute' : 'Mute'}
      direction="top"
      gap={4}
    >
      {isOnCall
        ? <TrackToggle
          source={Track.Source.Microphone}
          onChange={(enabled) => {
            if (setIsMuted) setIsMuted(!enabled);
          }}
          initialState={!isMuted}
          className={classes}
          showIcon={false}
        >
          {icon}
        </TrackToggle>
        : <button
          className={classes}
          type="button"
          onClick={() => { setIsMuted(muted => !muted); }}
        >
          {icon}
        </button>
      }
    </Tooltip>
  );
}