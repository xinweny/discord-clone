import { SidebarLayout } from '@components/layouts';

import { FriendsLink } from './friends-link';

export function DmsNavBar() {
  return (
    <nav>
      <SidebarLayout
        top={<button>Find or start a conversation</button>}
      >
        <FriendsLink />
      </SidebarLayout>
    </nav>
  );
}