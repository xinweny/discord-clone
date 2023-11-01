import { UserShortcutsBar } from '@features/users/profile';

import styles from './sidebar-layout.module.scss';

type SidebarLayoutProps = {
  top: React.ReactNode;
  children: React.ReactNode;
};

export function SidebarLayout({
  top, children,
}: SidebarLayoutProps) {
  return (
    <nav className={styles.layout}>
      <div className={styles.top}>
        {top}
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.panel}>
        <UserShortcutsBar />
      </div>
    </nav>
  );
}