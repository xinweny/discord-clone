import { useEffect, useState } from 'react';

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
} from '@components/ui/dropdowns';

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
    <Dropdown
      dropdownButton={<DropdownButton
        openComponent={activeServer
          ? <div>
            <img src={activeServer.avatarUrl} />
            <p>{activeServer.name}</p>
          </div>
          : <p>hi</p>
        }
        closeComponent={<input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
          autoFocus
        />}
      />}
    >
      {filteredServers.length > 0
        ? filteredServers.map(server => <DropdownItem
          key={server._id}
          onClick={() => { set(server._id); }}
        >
          <div>
            <img src={server.avatarUrl} />
            <p>{server.name}</p>
            {id === server._id && <img src="" alt="Selected" />}
          </div>
        </DropdownItem>)
        : <DropdownItem>
          <div>No results found.</div>
        </DropdownItem>
      }
    </Dropdown>
  );
}