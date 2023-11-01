import React from 'react';

import styles from './main-layout.module.scss';

type MainLayoutProps = {
  sideBar: React.ReactNode;
  children: React.ReactNode;
  topNotice?: React.ReactNode;
};

export function MainLayout({
  sideBar,
  children,
  topNotice,
}: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.notice}>
        {topNotice}
      </div>
      <div className={styles.content}>
        <div>
          {sideBar}
        </div>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}