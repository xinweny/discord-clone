import type { UserServerData } from '../types';

import { Tooltip } from '@components/ui/popups';
import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';

import parentStyles from './joined-servers-navbar.module.scss';

type JoinedServerLinkProps = {
  server: UserServerData;
};

export function JoinedServerLink({ server }: JoinedServerLinkProps) {
  const { _id: id, avatarUrl, name } = server;

  return (
    <Tooltip
      text={name}
      direction="right"
      options={{ gap: '16px' }}
    >
      <li className={parentStyles.listItem}>
        {avatarUrl
          ? <LinkImage href={`/channels/${id}`}>
              <Gif src={avatarUrl} alt={name} />
          </LinkImage>
          : <Acronym
              name={name}
              className={parentStyles.childContainer}
            />
        }
      </li>
    </Tooltip>
  );
}