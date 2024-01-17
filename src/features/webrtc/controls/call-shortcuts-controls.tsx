import { TrackToggle, useParticipantContext } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { Tooltip } from '@components/ui/popups';

import CameraIcon from '@assets/icons/camera.svg?react';
import CameraHiddenIcon from '@assets/icons/camera-hidden.svg?react';
import ScreenShareIcon from '@assets/icons/screen-share.svg?react';

import styles from './call-shortcuts-controls.module.scss';

export function CallShortcutsControls() {
  const participant = useParticipantContext();

  if (!participant) return null;

  const { isCameraEnabled, isScreenShareEnabled } = participant;

  return (
    <div className={styles.container}>
      <Tooltip
        text={`Turn ${isCameraEnabled ? 'Off' : 'On'} Camera`}
        direction="top"
        gap={4}
      >
        <TrackToggle
          source={Track.Source.Camera}
          showIcon={false}
          className={`${styles.button} ${isCameraEnabled ? styles.active : ''}`}
        >
          {isCameraEnabled
            ? <CameraIcon />
            : <CameraHiddenIcon />
          }
        </TrackToggle>
      </Tooltip>
      <Tooltip
        text={isScreenShareEnabled ? 'Stop Streaming' : 'Share Your Screen'}
        direction="top"
        gap={4}
      >
        <TrackToggle
          source={Track.Source.ScreenShare}
          showIcon={false}
          className={`${styles.button} ${isScreenShareEnabled ? styles.active : ''}`}
        >
          <ScreenShareIcon />
        </TrackToggle>
      </Tooltip>
    </div>
  );
}