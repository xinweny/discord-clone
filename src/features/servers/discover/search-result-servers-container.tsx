import type { PublicServerData } from '@features/servers/types';

import { SearchResultServersCard } from '@features/servers/discover';

type SearchResultServersContainerProps = {
  servers: PublicServerData[];
};

export function SearchResultServersContainer({
  servers,
}: SearchResultServersContainerProps) {
  return (
    <div>
      {servers.map(
        server => <SearchResultServersCard key={server._id} server={server} />
      )}
    </div>
  );
}