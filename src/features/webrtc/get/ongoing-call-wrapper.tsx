import { useEffect } from 'react';
import type { Participant } from 'livekit-client';

import { useContentLayoutContext } from '@components/context';

import styles from './ongoing-call-wrapper.module.scss';

type OngoingCallWrapperProps = {
  participants?: Participant[];
  header: React.ReactNode;
  placeholder?: React.ReactNode;
  children: React.ReactNode;
  controls?: React.ReactNode;
};

export function OngoingCallWrapper({
  participants,
  header,
  placeholder,
  children,
  controls,
}: OngoingCallWrapperProps) {
  const { setHeaderClass } = useContentLayoutContext()!;

  useEffect(() => {
    if (participants && participants.length > 0) setHeaderClass(styles.header);

    return () => { setHeaderClass(''); };
  }, []);

  const hasNoOngoingCall = !participants || participants.length === 0;

  if (!placeholder && hasNoOngoingCall) return header;

  return (
    <div className={styles.container}>
      <div className={styles.top}>{header}</div>
      <div className={styles.content}>
        {hasNoOngoingCall ? placeholder : children}
      </div>
      {controls && (
        <div className={styles.controls}>
          {controls}
        </div>
      )}
    </div>
  );
}

