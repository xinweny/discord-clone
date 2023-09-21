import { useGetUserStatusQuery } from '../api';

type UserStatusIconProps = {
  userId: string;
};

export function UserStatusIcon({ userId }: UserStatusIconProps) {
  const { data: status } = useGetUserStatusQuery(userId);

  return (status
    ? <img src="" alt="Online" />
    : <img src="" alt="Offline" />
  );
}