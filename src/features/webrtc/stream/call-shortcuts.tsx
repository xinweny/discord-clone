import {
  useConnectionState,
  useLocalParticipant,
  ParticipantContext,
} from '@livekit/components-react';

import { DisconnectFromRoomButton } from '../disconnect';
import { CallInfo } from './call-info';
import { CallShortcutsControls } from '../controls';

export function CallShortcuts() {
  const { localParticipant } = useLocalParticipant();
  const connectionState = useConnectionState();

  if (connectionState === 'disconnected') return null;

  return (
    <ParticipantContext.Provider value={localParticipant}>
      <div>
        <CallInfo />
        <DisconnectFromRoomButton>
          <img src="" alt="Disconnect" />
        </DisconnectFromRoomButton>
      </div>
      <CallShortcutsControls />
    </ParticipantContext.Provider>
  );
}