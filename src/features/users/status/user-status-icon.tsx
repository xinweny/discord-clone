import { useEffect } from 'react';

import { useGetUserStatusQuery } from '../api';

import CircleIcon from '@assets/icons/circle.svg?react';
import RingIcon from '@assets/icons/ring.svg?react';

import styles from './user-status-icon.module.scss';

type UserStatusIconProps = {
  userId: string;
  updateStatus?: (userId: string, isOnline: boolean) => void;
};

export function UserStatusIcon({ userId, updateStatus }: UserStatusIconProps) {
  const { data: status, isSuccess } = useGetUserStatusQuery(userId);

  useEffect(() => {
    if (updateStatus && isSuccess) updateStatus(userId, !!status);
  }, [status]);

  return (status
    ? <CircleIcon className={`${styles.icon} ${styles.online}`} />
    : <RingIcon className={`${styles.icon} ${styles.offline}`} />
  );
}