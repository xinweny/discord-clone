import type { UserData } from '../types';

import { ColorBanner, Avatar } from '@components/ui/media';
import { Separator } from '@components/ui/displays';

import { UserStatusIcon } from '../status';

import { UserHeader, UserInfo } from '.';

import styles from './user-short-profile.module.scss';

type UserShortProfileProps = {
  user: UserData;
};

export function UserShortProfile({
  user,
}: UserShortProfileProps) {
  const {
    _id,
    bannerColor,
    avatarUrl,
  } = user;

  return (
    <div>
      <ColorBanner className={styles.banner} color={bannerColor}>
        <div className={styles.wrapper}>
          <Avatar
            src={avatarUrl}
            notification={<UserStatusIcon userId={_id} />}
          />
        </div>
      </ColorBanner>
      <div className={styles.content}>
        <UserHeader user={user} />
        <Separator className={styles.separator} />
        <UserInfo user={user} />
      </div>
    </div>
  )
}