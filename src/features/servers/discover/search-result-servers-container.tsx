import type { PublicServer } from '@features/servers/api';

import { SearchResultServersCard } from '@features/servers/discover';

interface SearchResultServersContainerProps {
  servers: PublicServer[];
}

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