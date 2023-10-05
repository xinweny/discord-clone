import {
  ConnectionQualityIndicator,
  useConnectionState,
  useParticipantContext,
} from '@livekit/components-react';
import { capitalize } from 'lodash';

import { RoomLink } from '../controls';

export function CallInfo() {
  const participant = useParticipantContext();
  const connectionState = useConnectionState();

  if (!participant) return null;

  const { isCameraEnabled } = participant;

  return (
    <div>
      <div>
        <ConnectionQualityIndicator />
        <p>{`${isCameraEnabled ? 'Video' : 'Voice'} ${capitalize(connectionState)}`}</p>
      </div>
      <RoomLink />
    </div>
  );
}