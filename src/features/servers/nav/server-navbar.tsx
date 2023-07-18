import type { UserServer } from '@features/user/types';

import { LinkImage } from '@components/ui';
import { CreateServerButton } from '@features/servers/create';
import { UserServersList } from '@features/user/servers';

type ServerNavBarProps = {
  servers: UserServer[];
};

export function ServerNavBar({ servers }: ServerNavBarProps) {
  return (
    <div>
      <LinkImage href="/channels/@me" src="#" alt="Direct Messages" />
      <UserServersList servers={servers} />
      <CreateServerButton />
      <LinkImage href="/servers" src="#" alt="Explore Discoverable Servers" />
    </div>
  );
}