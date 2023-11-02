import { useParams } from 'react-router-dom';

import type { UserServerData } from '../types';

import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';

import { ServersNavbarItem } from '../nav';

type JoinedServerCardProps = {
  server: UserServerData;
};

export function JoinedServerCard({ server }: JoinedServerCardProps) {
  const { serverId } = useParams();

  const { _id: id, avatarUrl, name } = server;

  return (
    <ServersNavbarItem
      tooltipText={name}
      isActive={serverId === id}
    >
      <LinkImage href={`/channels/${id}`}>
        {avatarUrl
          ? <Gif src={avatarUrl} alt={name} />
          : <Acronym name={name} />
        }
      </LinkImage>
    </ServersNavbarItem>
  );
}