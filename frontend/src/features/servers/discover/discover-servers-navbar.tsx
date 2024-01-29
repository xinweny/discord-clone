import { SidebarLayout } from '@components/layouts';

import styles from './discover-servers-navbar.module.scss';

export function DiscoverServersNavbar() {
  return (
    <SidebarLayout>
      <div className={styles.container}>
        <h2>Discover</h2>
      </div>
    </SidebarLayout>
  );
}