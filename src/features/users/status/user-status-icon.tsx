import { useEffect } from 'react';

import { useGetUserStatusQuery } from '../api';

type UserStatusIconProps = {
  userId: string;
};

type UserStatusIconWithWatchProps = UserStatusIconProps & {
  updateStatus: (userId: string, isOnline: boolean) => void;
};

export function UserStatusIcon({ userId }: UserStatusIconProps) {
  const { data: status } = useGetUserStatusQuery(userId);

  return (status
    ? <img src="" alt="Online" />
    : <img src="" alt="Offline" />
  );
}

export function UserStatusIconWithWatch({ userId, updateStatus }: UserStatusIconWithWatchProps) {
  const result = useGetUserStatusQuery(userId, { refetchOnMountOrArgChange: true });
  const status = result.data;

  useEffect(() => {
    console.log('in effect', status);
    updateStatus(userId, !!status);
  }, [status]);

  return (status
    ? <img src="" alt="Online" />
    : <img src="" alt="Offline" />
  );
}