import { useRef, createContext, useContext, useEffect } from 'react';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './settings-layout.module.scss';

type SettingsLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  close: () => void;
};

export const SettingsContext = createContext<React.RefObject<HTMLButtonElement> | null>(null);

export const useSettingsContext = () => useContext(SettingsContext);

export function SettingsLayout({
  sidebar, children, close
}: SettingsLayoutProps) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') close(); };

    window.addEventListener('keydown', handleEscape);

    return () => { window.removeEventListener('keydown', handleEscape); };
  }, []);

  return (
    <SettingsContext.Provider value={closeBtnRef}>
      <div className={styles.layout}>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={styles.content}>
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
    </SettingsContext.Provider>
  );
}