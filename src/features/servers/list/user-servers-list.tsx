import { UserServerLink } from '../nav';

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
        server => <UserServerLink key={server._id} server={server} />
      )}
    </div>
  );
}