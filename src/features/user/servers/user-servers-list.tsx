import type { UserServer } from '@features/user/types';

import { UserServerNav } from './user-server-nav';

type UserServersListProps = {
  servers: UserServer[];
};

export function UserServersList(
  { servers }: UserServersListProps
) {
  return (
    <div>
      {servers.map(
        server => <UserServerNav key={server.id} server={server} />
      )}
    </div>
  );
}