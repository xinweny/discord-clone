import { SidebarLayout } from '@components/layouts';

import { FriendsLink } from './friends-link';
import { DmList } from '../list';
import { CreateDmHeader } from '../create';

export function DmsNavBar() {
  return (
    <nav>
      <SidebarLayout
        top={<button>Find or start a conversation</button>}
      >
        <FriendsLink />
        <CreateDmHeader />
        <DmList />
      </SidebarLayout>
    </nav>
  );
}