import { SidebarLayout } from '@components/layouts';

import { FriendsLinkCard } from './friends-link-card';
import { ConversationSearch, DmList } from '../list';
import { CreateDmHeader } from '../create';

import styles from './dms-navbar.module.scss';

export function DmsNavbar() {
  return (
    <SidebarLayout
      top={<ConversationSearch />}
    >
      <div className={styles.container}>
        <FriendsLinkCard />
        <CreateDmHeader />
        <DmList />
      </div>
    </SidebarLayout>
  );
}