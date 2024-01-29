import React from 'react';

import styles from './app-layout.module.scss';

type AppLayoutProps = {
  navBar: React.ReactNode;
  children: React.ReactNode;
};

export function AppLayout({
  navBar,
  children,
}: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.nav}>
        {navBar}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}