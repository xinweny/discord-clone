import { DateTime } from 'luxon';

import type { UserData } from '../types';

import { ColorBanner, Avatar } from '@components/ui/media';

import { UserStatusIcon } from '../status';

import styles from './user-short-profile.module.scss';

type UserShortProfileProps = {
  children?: React.ReactNode;
  user: UserData;
};

export function UserShortProfile({
  user,
  children,
}: UserShortProfileProps) {
  const {
    _id,
    bannerColor,
    displayName,
    createdAt,
    bio,
  } = user;

  const { avatarUrl, username } = user;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('d LLL yyyy');

  return (
    <div>
      <ColorBanner className={styles.banner} color={bannerColor || '#5C64F3'}>
        <div className={styles.wrapper}>
          <Avatar
            src={avatarUrl}
            notification={<UserStatusIcon userId={_id} />}
          />
        </div>
      </ColorBanner>
      <div className={styles.content}>
        <div>
          <h3>{displayName}</h3>
          <p>{username}</p>
          {'customStatus' in user && <p>{user.customStatus}</p>}
        </div>
        <div>
          {bio && <div>
            <h5>ABOUT ME</h5>
            <p>{bio}</p>
          </div>}
          <div>
            <h5>DISCORD MEMBER SINCE</h5>
            <p>{joinedDate(createdAt)}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}