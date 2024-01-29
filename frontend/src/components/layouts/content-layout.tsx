import { useState } from 'react';

import { ContentLayoutContext } from '@components/context';

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
  const [headerClass, setHeaderClass] = useState<string>('');

  return (
    <ContentLayoutContext.Provider value={{ setHeaderClass }}>
      <div className={styles.layout}>
        {header && (
          <div className={`${styles.header} ${headerClass}`}>
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
    </ContentLayoutContext.Provider>
  );
}