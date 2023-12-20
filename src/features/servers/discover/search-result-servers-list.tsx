import type { PublicServerData } from '@features/servers/types';

import { SearchResultServersCard } from '@features/servers/discover';

type SearchResultServersListProps = {
  servers: PublicServerData[];
};

export function SearchResultServersList({
  servers,
}: SearchResultServersListProps) {
  return (
    <div>
      {servers.map(
        server => <SearchResultServersCard key={server._id} server={server} />
      )}
    </div>
  );
}