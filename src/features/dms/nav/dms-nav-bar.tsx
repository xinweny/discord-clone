import { SidebarLayout } from '@components/layouts';

import { FriendsLink } from './friends-link';
import { DmList } from '../list';
import { CreateDmHeader } from '../create';

export function DmsNavBar() {
  return (
    <SidebarLayout
      top={<input
        type="text"
        placeholder="Find or start a conversation"
      />}
    >
      <FriendsLink />
      <CreateDmHeader />
      <DmList />
    </SidebarLayout>
  );
}