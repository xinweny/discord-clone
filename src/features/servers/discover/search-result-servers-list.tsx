import type { PublicServerData } from '@features/servers/types';

import { Separator } from '@components/ui/displays';

import { SearchResultServersCard } from '@features/servers/discover';

import nightStoreImage from '@assets/static/night-store.svg';

import styles from './search-result-servers-list.module.scss';

type SearchResultServersListProps = {
  servers: PublicServerData[];
};

export function SearchResultServersList({
  servers,
}: SearchResultServersListProps) {
  return (
    <div className={styles.list}>
      {servers.length > 0
        ? servers.map(
          server => (
            <>
              <SearchResultServersCard key={server._id} server={server} />
              <Separator className={styles.divider} />
            </>
          )
        )
        : (
          <div className={styles.noResult}>
            <img src={nightStoreImage} />
            <h2>No results found</h2>
            <span>Try searching for something else.</span>
          </div>
        )
      }
    </div>
  );
}