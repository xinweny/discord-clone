import { useState } from 'react';

import { useGetUserData } from '@features/auth/hooks';

import { Avatar } from '@components/ui/media';

import { UserSettingsButton } from '../settings';
import { ToggleMuteButton } from '@features/webrtc/controls';
import { UserStatusIcon } from '../status';

export function UserQuickInfo() {
  const [isFocus, setIsFocus] = useState(false);
  const { user } = useGetUserData();
  const { avatarUrl, displayName, username } = user.data!;

  return (
    <div
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <div>
        <Avatar
          src={avatarUrl}
          notification={<UserStatusIcon
            userId={user.data!._id}
          />}
        />
        <div>
          <p><strong>{displayName}</strong></p>
          {isFocus
            ? <p>{username}</p>
            : <p>status</p>
          }
        </div>
      </div>
      <div>
        <ToggleMuteButton />
        <UserSettingsButton />
      </div>
    </div>
  );
}