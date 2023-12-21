import { useNavigate } from 'react-router-dom';
import pluralize from 'pluralize';

import type { PublicServerData } from '../types';

import { Gif } from '@components/ui/media';
import { Acronym } from '@components/ui/media';

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
    avatarUrl,
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
          {avatarUrl
            ? <Gif src={avatarUrl} />
            : <Acronym name={name} className={styles.acronym} />
          }
        </div>
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className={styles.memberCount}>
          <div className={styles.icon}></div>
          <span>{pluralize('Member', memberCount, true).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
        </div>
      </div>
    </div>
  );
}