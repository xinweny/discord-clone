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

  const props = {
    fill: status ? '#23a55a' : '#80848e',
    mask: `url(#svg-mask-status-${status ? 'online' : 'offline'})`,
  };

  return (
    <rect
      width="10"
      height="10"
      x="22"
      y="22"
      {...props}
    ></rect>
  );
}