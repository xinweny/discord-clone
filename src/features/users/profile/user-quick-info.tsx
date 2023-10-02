import { useState } from 'react';

import { useGetUserData } from '@features/auth/hooks';

import { Avatar } from '@components/ui/media';

export function UserQuickInfo() {
  const [isFocus, setIsFocus] = useState(false);
  const { user } = useGetUserData();
  const { avatarUrl, displayName, username } = user.data!;

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