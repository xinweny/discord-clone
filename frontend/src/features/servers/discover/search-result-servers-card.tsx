import { useNavigate } from 'react-router-dom';
import pluralize from 'pluralize';

import { ServerAvatar } from '../get';

import type { PublicServerData } from '@features/servers/types';

import styles from './search-result-servers-card.module.scss';

type SearchResultServersCardProps = {
  server: PublicServerData;
};

export function SearchResultServersCard({
  server,
}: SearchResultServersCardProps) {
  const navigate = useNavigate();

  const { bannerUrl, name, description, memberCount, _id } = server;

  return (
    <div
      className={styles.card}
      onClick={() => { navigate(`/channels/${_id}`) }}
      role="button"
    >
      <div className={styles.banner}>
        {bannerUrl && <img src={bannerUrl} />}
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <ServerAvatar server={server} />
          </div>
          <h2>{name}</h2>
        </div>
        <p>{description}</p>
        <span>{pluralize('Member', memberCount, true).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
      </div>
    </div>
  );
}