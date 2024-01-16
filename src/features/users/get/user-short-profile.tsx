import type { UserData } from '../types';

import { Separator } from '@components/ui/displays';

import { UserHeader, UserInfo, UserSplash } from '.';

import styles from './user-short-profile.module.scss';

type UserShortProfileProps = {
  user: UserData;
  children?: React.ReactNode;
};

export function UserShortProfile({
  user,
  children,
}: UserShortProfileProps) {
  return (
    <div>
      <UserSplash user={user} className={styles.banner} />
      <div className={styles.content}>
        <UserHeader user={user} />
        <Separator className={styles.separator} />
        <UserInfo user={user} />
        {children}
      </div>
    </div>
  );
}