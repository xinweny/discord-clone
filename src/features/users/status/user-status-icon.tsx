import { useEffect } from 'react';

import { useGetUserStatusQuery } from '../api';

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
    ? <img src="" alt="Online" />
    : <img src="" alt="Offline" />
  );
}