import { useEffect } from 'react';
import type { Participant } from 'livekit-client';

import { useContentLayoutContext } from '@components/context';

import styles from './ongoing-call-wrapper.module.scss';

type OngoingCallWrapperProps = {
  participants?: Participant[];
  header: React.ReactNode;
  children: React.ReactNode;
  controls?: React.ReactNode;
  alwaysShow?: boolean;
  className?: string;
};

export function OngoingCallWrapper({
  participants,
  header,
  children,
  controls,
  alwaysShow = false,
  className,
}: OngoingCallWrapperProps) {
  const { setHeaderClass } = useContentLayoutContext()!;

  const hasNoOngoingCall = !participants || participants.length === 0;

  useEffect(() => {
    if (alwaysShow || !hasNoOngoingCall) setHeaderClass(styles.header);

    return () => { setHeaderClass(''); };
  }, []);

  if (!alwaysShow && hasNoOngoingCall) return header;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.top}>{header}</div>
      <div className={styles.content}>
        {children}
      </div>
      {controls && (
        <div className={styles.controls}>
          {controls}
        </div>
      )}
    </div>
  );
}

