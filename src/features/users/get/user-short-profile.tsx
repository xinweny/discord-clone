import { DateTime } from 'luxon';

import type { UserData } from '../types';

import { ColorBanner, Avatar } from '@components/ui/media';
import { Separator } from '@components/ui/displays';

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
    customStatus,
  } = user;

  const { avatarUrl, username } = user;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('LLL d, yyyy');

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
        <div className={styles.header}>
          <h2>{displayName}</h2>
          <h3>{username}</h3>
          {customStatus && <p>{customStatus}</p>}
        </div>
        <Separator className={styles.separator} />
        <div className={styles.info}>
          {bio && <div>
            <h4>ABOUT ME</h4>
            <p>{bio}</p>
          </div>}
          <div>
            <h4>DISCORD MEMBER SINCE</h4>
            <p>{joinedDate(createdAt)}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}