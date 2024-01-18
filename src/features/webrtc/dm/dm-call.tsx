import { useEffect } from 'react';
import { useHover } from '@uidotdev/usehooks';
import { useParticipants, ParticipantLoop } from '@livekit/components-react';

import { useContentLayoutContext } from '@components/context';

import { CallControls } from '../stream';
import { DmParticipantTile } from './dm-participant-tile';

import styles from './dm-call.module.scss';

type DmHeaderProps = {
  header?: React.ReactNode;
};

export function DmCall({ header }: DmHeaderProps) {
  const participants = useParticipants();

  const { setHeaderClass } = useContentLayoutContext()!;

  const [hoverRef, isHovered] = useHover();

  useEffect(() => {
    setHeaderClass(styles.header);

    return () => { setHeaderClass(''); };
  }, []);

  return (
    <div className={styles.container} ref={hoverRef}>
      <div className={styles.top} hidden={!isHovered}>
        {header}
      </div>
      <div className={styles.tiles}>
        <ParticipantLoop participants={participants}>
          <DmParticipantTile isFocus={isHovered} />
        </ParticipantLoop>
      </div>
      <div className={styles.controls}>
        <CallControls show={isHovered} />
      </div>
    </div>
  );
}