import { LinkImage } from '@components/ui/links';

import { CreateServerButton } from '@features/servers/create';
import { UserServersList } from '@features/servers/list';

type ServerNavBarProps = {
  userId: string;
}

export function ServersNavBar({ userId }: ServerNavBarProps) {
  return (
    <div>
      <LinkImage href="/channels/@me" src="#" alt="Direct Messages" />
      <UserServersList userId={userId} />
      <CreateServerButton />
      <LinkImage href="/servers" src="#" alt="Explore Discoverable Servers" />
    </div>
  );
}