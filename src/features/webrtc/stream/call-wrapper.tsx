import { useEffect } from 'react';

import { useContentLayoutContext } from '@components/context';

import { useVideoMode } from '../hooks';

import { CallControls } from '../controls';

import styles from './call-wrapper.module.scss';

type CallWrapperProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  divRef?: React.RefObject<HTMLDivElement>;
  isFocused?: boolean;
  className?: string;
};

export function CallWrapper({
  header,
  children,
  divRef,
  isFocused = true,
  className,
}: CallWrapperProps) {
  const { setHeaderClass } = useContentLayoutContext()!;

  const videoMode = useVideoMode();

  const showMenus = !videoMode || videoMode && isFocused;

  useEffect(() => {
    setHeaderClass(styles.header);

    return () => {
      setHeaderClass('');
    };
  }, []);

  return (
    <div className={`${styles.container} ${className || ''}`} ref={divRef}>
      <div className={styles.top}>
        {showMenus && header}
      </div>
      <div className={styles.tiles}>
        {children}
      </div>
      <div className={styles.controls}>
        {showMenus && <CallControls />}
      </div>
    </div>
  );
}