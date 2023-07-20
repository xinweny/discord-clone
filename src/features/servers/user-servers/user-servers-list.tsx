import { UserServerNav } from './user-server-nav';

import { useGetJoinedServersQuery } from '../api';

type UserServersListProps = {
  userId: string;
};

export function UserServersList({ userId }: UserServersListProps) {
  const servers = useGetJoinedServersQuery(userId);

  if (servers.isLoading) return null;

  return (
    <div>
      {servers.data?.map(
        server => <UserServerNav key={server._id} server={server} />
      )}
    </div>
  );
}