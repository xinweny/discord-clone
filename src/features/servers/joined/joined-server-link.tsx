import type { UserServerData } from '../types';

import { HoverPopup } from '@components/ui/popups';

import { LinkImage } from '@components/ui/links';

type JoinedServerLinkProps = {
  server: UserServerData;
};

export function JoinedServerLink({ server }: JoinedServerLinkProps) {
  const { _id: id, avatarUrl, name } = server;

  return (
    <HoverPopup
      popup={<p>{name}</p>}
    >
      <li>
        <LinkImage href={`/channels/${id}`} src={avatarUrl} alt={name} />
      </li>
    </HoverPopup>
  );
}