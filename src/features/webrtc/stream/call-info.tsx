import {
  useConnectionQualityIndicator,
  useConnectionState,
  useParticipantContext,
} from '@livekit/components-react';
import { capitalize } from 'lodash';

import { RoomLink } from '../controls';

import PingIcon from '@assets/icons/ping.svg?react';

import styles from './call-info.module.scss';

export function CallInfo() {
  const participant = useParticipantContext();
  const connectionState = useConnectionState();

  const { quality } = useConnectionQualityIndicator();

  if (!participant) return null;

  const { isCameraEnabled } = participant;

  return (
    <div className={styles.info}>
      <div className={`${styles.quality} ${styles[quality]} ${styles[connectionState]}`}>
        {connectionState === 'connected' && <PingIcon />}
        <span>
          {connectionState === 'connected'
            ? `${isCameraEnabled ? 'Video' : 'Voice'} ${capitalize(connectionState)}`
            : capitalize(connectionState)
          }
        </span>
      </div>
      <RoomLink className={styles.link} />
    </div>
  );
}