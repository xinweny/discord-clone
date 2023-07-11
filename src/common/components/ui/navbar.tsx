import { LinkImage } from '.';
import { CreateServerButton, UserServersList } from '@features/servers/components';

export function NavBar({ servers }) {
  return (
    <div>
      <LinkImage href="/channels/@me" src="#" alt="Direct Messages" />
      <UserServersList servers={servers} />
      <CreateServerButton />
      <LinkImage href="/servers" src="#" alt="Explore Discoverable Servers" />
    </div>
  );
}