import { useState } from 'react';

import { useGetUserData } from '@features/auth/hooks';

import { Avatar } from '@components/ui/media';
import { Popout } from '@components/ui/popups';

import { UserSettingsButton } from '../settings';
import { ToggleMuteButton } from '@features/webrtc/controls';
import { UserStatusIcon } from '@features/statuses/get';

import { SelfShortProfile } from './self-short-profile';

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
      <Popout
        renderPopup={() => <SelfShortProfile />}
        position={{
          direction: 'top',
          align: 'start',
          gap: 12,
        }}
      >
        <div className={styles.content}>
          <Avatar
            src={avatarUrl}
            notification={<UserStatusIcon
              userId={user.data!.id}
            />}
          />
          <div>
            <p className={styles.header}>{displayName}</p>
            {isFocus
              ? <p>{username}</p>
              : <p>Online</p>
            }
          </div>
        </div>
      </Popout>
      <div className={styles.buttonsContainer}>
        <ToggleMuteButton />
        <UserSettingsButton />
      </div>
    </div>
  );
}