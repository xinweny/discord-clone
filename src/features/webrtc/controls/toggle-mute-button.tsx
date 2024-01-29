import { TrackToggle } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { useLivekitContext } from '../hooks';

import { Tooltip } from '@components/ui/popups';

import UnmutedIcon from '@assets/icons/microphone.svg?react';
import MutedIcon from '@assets/icons/microphone-mute.svg?react';
import muteAudio from '@assets/audio/mute.mp3';
import unmuteAudio from '@assets/audio/unmute.mp3';

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

  const handleToggle = () => {
    setIsMuted(muted => !muted);

    new Audio(isMuted ? unmuteAudio : muteAudio).play();
  };

  return (
    <Tooltip
      text={isMuted ? 'Unmute' : 'Mute'}
      direction="top"
      gap={4}
    >
      {isOnCall
        ? <TrackToggle
          source={Track.Source.Microphone}
          onClick={handleToggle}
          initialState={!isMuted}
          className={classes}
          showIcon={false}
        >
          {icon}
        </TrackToggle>
        : <button
          className={classes}
          type="button"
          onClick={handleToggle}
        >
          {icon}
        </button>
      }
    </Tooltip>
  );
}