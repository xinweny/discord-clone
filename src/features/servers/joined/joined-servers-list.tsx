import { JoinedServerLink } from '.';

import { useGetJoinedServersQuery } from '../api';

type JoinedServersListProps = {
  userId: string;
};

export function JoinedServersList({ userId }: JoinedServersListProps) {
  const servers = useGetJoinedServersQuery(userId);

  if (servers.isLoading) return null;

  return (
    <div>
      {servers.data?.map(
        server => <JoinedServerLink key={server._id} server={server} />
      )}
    </div>
  );
}