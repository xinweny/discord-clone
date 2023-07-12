import { ServerNav } from './server-nav';

interface UserServersListProps {
  servers: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}

export function UserServersList(
  { servers }: UserServersListProps
) {
  return (
    <div>
      {servers.map(
        server => <ServerNav key={server.id} server={server} />
      )}
    </div>
  );
}