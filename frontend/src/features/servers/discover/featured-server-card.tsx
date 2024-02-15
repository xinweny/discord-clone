import { useNavigate } from 'react-router-dom';
import pluralize from 'pluralize';

import type { PublicServerData } from '../types';

import { ServerAvatar } from '../get';

import styles from './featured-server-card.module.scss';

type FeaturedServerCardProps = {
  server: PublicServerData;
};

export function FeaturedServerCard({ server }: FeaturedServerCardProps) {
  const navigate = useNavigate();

  const {
    _id,
    name,
    description,
    bannerUrl,
    memberCount,
  } = server;

  return (
    <div
      className={styles.card}
      role="button"
      onClick={() => { navigate(`/channels/${_id}`); }}
    >
      <div className={styles.images}>
        <div className={styles.banner}>
          {bannerUrl && <img src={bannerUrl} />}
        </div>
        <div className={styles.avatar}>
          <ServerAvatar server={server} />
        </div>
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <div className={styles.memberCount}>
          <div className={styles.icon}></div>
          <span>{pluralize('Member', memberCount, true).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
        </div>
      </div>
    </div>
  );
}