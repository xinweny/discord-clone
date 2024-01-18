import { useEffect } from 'react';
import { useHover } from '@uidotdev/usehooks';

import { useContentLayoutContext } from '@components/context';

import { useVideoMode } from '../hooks';

import { CallControls } from '../controls';

import styles from './call-wrapper.module.scss';

type CallWrapperProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export function CallWrapper({ header, children }: CallWrapperProps) {
  const { setHeaderClass } = useContentLayoutContext()!;

  const [hoverRef, isHovered] = useHover();

  const videoMode = useVideoMode();

  const showMenus = !videoMode || videoMode && isHovered;

  useEffect(() => {
    setHeaderClass(styles.header);

    return () => { setHeaderClass(''); };
  }, []);

  return (
    <div className={styles.container} ref={hoverRef}>
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