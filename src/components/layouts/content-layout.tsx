import React from 'react';

import styles from './content-layout.module.scss';

type ContentLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  infoTab?: React.ReactNode;
};

export function ContentLayout({
  header,
  children,
  infoTab,
}: ContentLayoutProps) {
  return (
    <div className={styles.layout}>
      {header && (
        <div className={styles.header}>
          {header}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
      {infoTab && (
        <div className={styles.panel}>
          {infoTab}
        </div>
      )}
    </div>
  );
}