import type { UserServer } from '@features/user/types';

import { LinkImage } from '.';
import { CreateServerButton } from '@features/servers/create';
import { UserServersList } from '@features/user/user-servers';

interface NavBarProps {
  servers: UserServer[];
}

export function NavBar({ servers }: NavBarProps) {
  return (
    <div>
      <LinkImage href="/channels/@me" src="#" alt="Direct Messages" />
      <UserServersList servers={servers} />
      <CreateServerButton />
      <LinkImage href="/servers" src="#" alt="Explore Discoverable Servers" />
    </div>
  );
}