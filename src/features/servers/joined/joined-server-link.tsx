import { useParams } from 'react-router-dom';

import type { UserServerData } from '../types';

import { Tooltip } from '@components/ui/popups';
import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';

import parentStyles from './joined-servers-navbar.module.scss';

type JoinedServerLinkProps = {
  server: UserServerData;
};

export function JoinedServerLink({ server }: JoinedServerLinkProps) {
  const { serverId } = useParams();

  const { _id: id, avatarUrl, name } = server;

  return (
    <Tooltip
      text={name}
      direction="right"
      options={{ gap: '16px' }}
    >
      <li className={`${parentStyles.listItem} ${(serverId === id) && parentStyles.active}`}>
        <LinkImage href={`/channels/${id}`}>
          {avatarUrl
            ? <Gif src={avatarUrl} alt={name} />
            : <Acronym
              name={name}
              className={parentStyles.childContainer}
            />
          }
        </LinkImage>
      </li>
    </Tooltip>
  );
}