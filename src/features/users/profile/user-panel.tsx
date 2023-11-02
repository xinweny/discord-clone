import { useState } from 'react';

import { useGetUserData } from '@features/auth/hooks';

import { Avatar } from '@components/ui/media';

import { UserSettingsButton } from '../settings';
import { ToggleMuteButton } from '@features/webrtc/controls';
import { UserStatusIcon } from '../status';

import styles from './user-panel.module.scss';

export function UserPanel() {
  const [isFocus, setIsFocus] = useState(false);
  const { user } = useGetUserData();
  const { avatarUrl, displayName, username } = user.data!;

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <div className={styles.content}>
        <Avatar
          src={avatarUrl}
          notification={<UserStatusIcon
            userId={user.data!._id}
          />}
        />
        <div>
          <p className={styles.displayName}>{displayName}</p>
          {isFocus
            ? <p>{username}</p>
            : <p>Online</p>
          }
        </div>
      </div>
      <div className={styles.buttons}>
        <ToggleMuteButton />
        <UserSettingsButton />
      </div>
    </div>
  );
}