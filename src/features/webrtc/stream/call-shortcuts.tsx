import {
  useConnectionState,
  useLocalParticipant,
  ParticipantContext,
} from '@livekit/components-react';

import { Tooltip } from '@components/ui/popups';

import { DisconnectFromRoomButton } from '../disconnect';
import { CallInfo } from './call-info';
import { CallShortcutsControls } from '../controls';

import PhoneIcon from '@assets/icons/phone.svg?react';

import styles from './call-shortcuts.module.scss';

export function CallShortcuts() {
  const { localParticipant } = useLocalParticipant();
  const connectionState = useConnectionState();

  if (connectionState === 'disconnected') return null;

  return (
    <ParticipantContext.Provider value={localParticipant}>
      <div className={styles.container}>
        <div className={styles.upper}>
          <CallInfo />
          <Tooltip text="Disconnect" direction="top" gap={4}>
            <DisconnectFromRoomButton>
              <div className={styles.disconnectButton}>
                <PhoneIcon />
              </div>
            </DisconnectFromRoomButton>
          </Tooltip>
        </div>
        <CallShortcutsControls />
      </div>
    </ParticipantContext.Provider>
  );
}