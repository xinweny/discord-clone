import { useState } from 'react';

import type { UserServerData } from '../types';

import { LinkImage } from '@components/ui/links';


type ServerNavProps = {
  server: UserServerData;
};

export function UserServerLink({ server }: ServerNavProps) {
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