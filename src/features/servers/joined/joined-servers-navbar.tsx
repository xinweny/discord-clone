import { LinkImage } from '@components/ui/links';

import { CreateServerButton } from '@features/servers/create';
import { JoinedServersList } from '.';

type JoinedServerNavbarProps = {
  userId: string;
}

export function JoinedServersNavbar({ userId }: JoinedServerNavbarProps) {
  return (
    <div>
      <LinkImage href="/channels/@me" src="#" alt="Direct Messages" />
      <JoinedServersList userId={userId} />
      <CreateServerButton />
      <LinkImage href="/servers" src="#" alt="Explore Discoverable Servers" />
    </div>
  );
}