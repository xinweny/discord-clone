import { useState } from 'react';

import type { UserServerData } from '../types';

import { LinkImage } from '@components/ui/links';


type JoinedServerLinkProps = {
  server: UserServerData;
};

export function JoinedServerLink({ server }: JoinedServerLinkProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const { _id: id, avatarUrl, name } = server;

  return (
    <div
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <LinkImage href={`/channels/${id}`} src={avatarUrl} />
      {isFocus && (
        <div>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
}