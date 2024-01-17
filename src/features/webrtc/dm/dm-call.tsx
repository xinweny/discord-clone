import { useEffect, useRef } from 'react';

import { useParticipants, ParticipantLoop } from '@livekit/components-react';

import { useContentLayoutContext } from '@components/context';

import { CallControls } from '../stream';
import { DmParticipantTile } from './dm-participant-tile';

import styles from './dm-call.module.scss';

export function DmCall() {
  const participants = useParticipants();

  const { setHeaderClass } = useContentLayoutContext()!;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderClass(styles.header);

    return () => { setHeaderClass(''); };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <ParticipantLoop participants={participants}>
        <DmParticipantTile />
      </ParticipantLoop>
      <CallControls />
    </div>
  );
}