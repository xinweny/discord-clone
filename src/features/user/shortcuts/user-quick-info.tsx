import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { UserSelfData } from '../types';

import { Avatar } from '@components/ui';

export function UserQuickInfo() {
  const [isFocus, setIsFocus] = useState(false);
  const { avatarUrl, displayName, username } = useOutletContext<UserSelfData>();

  return (
    <div
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <Avatar src={avatarUrl} />
      <div>
        <p><strong>{displayName}</strong></p>
        {isFocus
          ? <p>{username}</p>
          : <p>status</p>
        }
      </div>
    </div>
  );
}