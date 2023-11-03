import { useEffect, useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { useDropdown } from '@components/hooks';

import type { UserServerData } from '@features/servers/types';
import type { ActiveIdState } from '@hooks';

type ServerProfileSelectorProps = {
  activeServerId: ActiveIdState;
  joinedServers: UserServerData[];
};

export function ServerProfileSelector({
  activeServerId,
  joinedServers,
}: ServerProfileSelectorProps) {
  const { id, set } = activeServerId;

  const [query, setQuery] = useState<string>('');
  const [filteredServers, setFilteredServers] = useState<UserServerData[]>(joinedServers);

  const { isOpen, toggle, close } = useDropdown();

  const ref = useClickAway<HTMLDivElement>(close);

  const activeServer = joinedServers.find(server => server._id === id);

  useEffect(() => {
    setFilteredServers(query.length === 0
      ? joinedServers
      : joinedServers.filter(
        server => server.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  useEffect(() => {
    setQuery('');
    setFilteredServers(joinedServers);
  }, [activeServerId]);

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={() => { toggle(); }}
      >{isOpen
        ? <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
          autoFocus
        />
        : <div>
          <img src={activeServer?.avatarUrl} />
          <p>{activeServer?.name || ''}</p>
        </div>
      }</button>
      {isOpen &&
        <ul>{filteredServers.length > 0
          ? filteredServers.map(server => <li key={server._id}>
            <button onClick={() => {
              set(server._id);
              close();
            }}>
              <div>
                <img src={server.avatarUrl} />
                <p>{server.name}</p>
                {id === server._id && <img src="" alt="Selected" />}
              </div>
            </button>
          </li>)
          : <button
            type="button"
            onClick={() => {
              close();
              setQuery('');
            }}
          >No results found.</button>
        }
      </ul>
      }
    </div>
  );
}