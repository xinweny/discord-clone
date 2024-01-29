import { useNavigate } from 'react-router-dom';

import type { ServerData } from '@features/servers/types';

import { ServerAvatar } from '@features/servers/get';

import styles from './mutual-server-card.module.scss';

type MutualServerCardProps = {
  server: ServerData;
};

export function MutualServerCard({
  server
}: MutualServerCardProps) {
  const { name, _id } = server;

  const navigate = useNavigate();

  return (
    <li className={styles.card}>
      <button onClick={() => { navigate(`/channels/${_id}`); }}>
        <ServerAvatar server={server} />
        <span>{name}</span>
      </button>
    </li>
  );
}