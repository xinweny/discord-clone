import { SidebarLayout } from '@components/layouts';

import { FriendsLink } from './friends-link';
import { ConversationSearch, DmList } from '../list';
import { CreateDmHeader } from '../create';

export function DmsNavBar() {
  return (
    <SidebarLayout
      top={<ConversationSearch />}
    >
      <FriendsLink />
      <CreateDmHeader />
      <DmList />
    </SidebarLayout>
  );
}