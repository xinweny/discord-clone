import { useEffect } from 'react';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './settings-layout.module.scss';

type SettingsLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  close: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};


export function SettingsLayout({
  sidebar,
  children,
  close,
  closeBtnRef,
}: SettingsLayoutProps) {
  useEffect(() => {
    const handleEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') close();
    };

    window.addEventListener('keydown', handleEscape);

    return () => { window.removeEventListener('keydown', handleEscape); };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.content}>
        <div>
          {children}
        </div>
        <button ref={closeBtnRef} onClick={close} className={styles.closeButton}>
          <div className={styles.iconWrapper}>
            <div>
              <CrossIcon />
            </div>
            <p>ESC</p>
          </div>
        </button>
      </div>
    </div>
  );
}