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


export function CallControls() {
  const { localParticipant } = useLocalParticipant();

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