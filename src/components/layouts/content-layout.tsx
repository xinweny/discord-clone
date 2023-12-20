import React from 'react';

import styles from './content-layout.module.scss';

type ContentLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  panel?: React.ReactNode;
};

export function ContentLayout({
  header,
  children,
  panel,
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
      <div className={styles.panel}>
        {panel}
      </div>
    </div>
  );
}