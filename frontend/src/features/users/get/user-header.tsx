import type { UserData } from '../types';

import styles from './user-header.module.scss';

type UserHeaderProps = {
  user: Pick<UserData, 'displayName' | 'username' | 'customStatus'>;
  className?: string;
};

export function UserHeader({ user, className }: UserHeaderProps) {
  const { displayName, username, customStatus } = user;

  return (
    <div className={`${styles.header} ${className || ''}`}>
      <h1>{displayName}</h1>
      <span>{username}</span>
      {customStatus && <p>{customStatus}</p>}
    </div>
  );
}