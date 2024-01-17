import {
  useConnectionState,
  useLocalParticipant,
  ParticipantContext,
} from '@livekit/components-react';

import { DisconnectFromRoomButton } from '../disconnect';
import { CallInfo } from './call-info';
import { CallShortcutsControls } from '../controls';

import styles from './call-shortcuts.module.scss';

export function CallShortcuts() {
  const { localParticipant } = useLocalParticipant();
  const connectionState = useConnectionState();

  if (connectionState === 'disconnected') return null;

  return (
    <ParticipantContext.Provider value={localParticipant}>
      <div className={styles.container}>
        <CallInfo />
        <DisconnectFromRoomButton>
          <img src="" alt="Disconnect" />
        </DisconnectFromRoomButton>
        <CallShortcutsControls />
      </div>
    </ParticipantContext.Provider>
  );
}