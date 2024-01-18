import {
  ParticipantContext,
  useLocalParticipant,
} from '@livekit/components-react';

import {
  ToggleCameraButton,
  ToggleMuteButton,
  ToggleScreenShareButton,
} from '.';
import { DisconnectFromRoomButton } from '../disconnect';

import styles from './call-controls.module.scss';

export function CallControls() {
  const { localParticipant } = useLocalParticipant();

  return (
    <ParticipantContext.Provider value={localParticipant}>
      <div className={styles.container}>
        <ToggleCameraButton
          activeClassName={styles.active}
        />
        <ToggleScreenShareButton 
          activeClassName={styles.active}
          toggleIcon
        />
        <ToggleMuteButton
          className={styles.muteButton}
          activeClassName={styles.active}
        />
        <DisconnectFromRoomButton className={styles.disconnectButton} />
      </div>
    </ParticipantContext.Provider>
  );
}