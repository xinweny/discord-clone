import { useEffect, useState, useRef } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { useDropdown } from '@components/hooks';

import type { UserServerData } from '@features/servers/types';
import type { ActiveIdState } from '@hooks';

import { ServerAvatar } from '@features/servers/get';

import ChevronIcon from '@assets/icons/chevron.svg?react';
import CheckmarkCircleIcon from '@assets/icons/checkmark-circle.svg?react';

import styles from './server-profile-selector.module.scss';

type ServerProfileSelectorProps = {
  activeServerId: ActiveIdState;
  joinedServers: UserServerData[];
};

export function ServerProfileSelector({
  activeServerId,
  joinedServers,
}: ServerProfileSelectorProps) {
  const { id, set } = activeServerId;

  const btnRef = useRef<HTMLDivElement>(null);

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
    <div ref={ref} className={styles.wrapper}>
      <div
        className={styles.container}
        role="button"
        onClick={() => { if (!isOpen) toggle(); }}
        style={isOpen ? { borderRadius: '4px 4px 0px 0px' } : undefined}
        ref={btnRef}
      >
        {activeServer && <ServerAvatar
          className={styles.avatar}
          server={activeServer}
        />}
        {isOpen
          ? <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); }}
            placeholder="Search servers"
            autoFocus
          />
          : <span>{activeServer?.name || ''}</span>
        }
        <ChevronIcon
          className={styles[isOpen ? 'open' : 'close']}
          role="button"
          onClick={() => { if (isOpen) toggle(); }}
        />
      </div>
      {isOpen && (
        <ul
          className={styles.selector}
          style={btnRef.current
            ? {
              top: `${btnRef.current.getBoundingClientRect().height}px`,
              width: `${btnRef.current.getBoundingClientRect().width - 2}px`,
            }
            : undefined
          }
        >
          {filteredServers.length > 0
            ? filteredServers.map(server => <li
              key={server._id}
              className={styles.listItem}
            >
              <button
                onClick={() => {
                  set(server._id);
                  close();
                }}
                className={server._id === activeServer?._id ? styles.active : undefined}
              >
                <ServerAvatar className={styles.avatar} server={server} />
                <span>{server.name}</span>
                {id === server._id && <CheckmarkCircleIcon />}
              </button>
            </li>)
            : <button
              className={styles.noResult}
              type="button"
              onClick={() => {
                close();
                setQuery('');
              }}
            >
              No results found.
            </button>
          }
        </ul>
      )}
    </div>
  );
}