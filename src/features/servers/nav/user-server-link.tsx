import { useState } from 'react';

import { LinkImage } from '@components/ui';

type ServerNavProps = {
  server: {
    _id: string;
    name: string;
    avatarUrl: string;
  }
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