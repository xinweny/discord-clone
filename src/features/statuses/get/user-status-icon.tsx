import { useGetUserStatusQuery } from '../api';

type UserStatusIconProps = {
  userId: string;
};

export function UserStatusIcon({ userId }: UserStatusIconProps) {
  const { data: status } = useGetUserStatusQuery(userId);

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