import { UserShortcutsBar } from '@features/users/profile';

import styles from './sidebar-layout.module.scss';

type SidebarLayoutProps = {
  top?: React.ReactNode;
  children: React.ReactNode;
  handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  scrollerRef?: React.RefObject<HTMLDivElement>;
};

export function SidebarLayout({
  top, children, handleScroll, scrollerRef,
}: SidebarLayoutProps) {
  return (
    <nav className={styles.layout}>
      <div className={styles.top}>
        {top}
      </div>
      <div
        className={styles.content}
        onScroll={handleScroll}
        ref={scrollerRef}
      >
        {children}
      </div>
      <div className={styles.panel}>
        <UserShortcutsBar />
      </div>
    </nav>
  );
}