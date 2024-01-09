import { DateTime } from 'luxon';

import type { UserData } from '../types';

import styles from './user-info.module.scss';

type UserInfoProps = {
  user: UserData;
};

export function UserInfo({ user }: UserInfoProps) {
  const { bio, createdAt } = user;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('LLL d, yyyy');

  return (
    <div className={styles.info}>
      {bio && <div>
        <h3>ABOUT ME</h3>
        <p>{bio}</p>
      </div>}
      <div>
        <h3>DISCORD MEMBER SINCE</h3>
        <span>{joinedDate(createdAt)}</span>
      </div>
    </div>
  );
}