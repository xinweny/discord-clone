import {
  ParticipantContext,
  useLocalParticipant,
} from '@livekit/components-react';

import {
  ToggleCameraButton,
  ToggleMuteButton,
  ToggleScreenShareButton,
} from '../controls';
import { DisconnectFromRoomButton } from '../disconnect';

import styles from './call-controls.module.scss';

type CallControlsProps = {
  show?: boolean;
};

export function CallControls({ show }: CallControlsProps) {
  const { localParticipant } = useLocalParticipant();

  const { isCameraEnabled } = localParticipant;

  if (isCameraEnabled && !show) return null;

  return (
    <ParticipantContext.Provider value={localParticipant}>
      <div className={styles.container}>
        <ToggleCameraButton />
        <ToggleScreenShareButton />
        <ToggleMuteButton
          className={styles.muteButton}
          activeClassName={styles.muted}
        />
        <DisconnectFromRoomButton className={styles.disconnectButton} />
      </div>
    </ParticipantContext.Provider>
  );
}