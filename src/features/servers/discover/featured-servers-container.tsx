import { FeaturedServerCard } from './featured-server-card';

import { useGetPublicServersQuery } from '../api';

import compassFooterImg from '@assets/static/compass-footer.svg';

import styles from './featured-servers-container.module.scss';

type FeaturedServersContainerProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

export function FeaturedServersContainer({
  containerRef,
}: FeaturedServersContainerProps) {
  const { data: servers } = useGetPublicServersQuery('');

  return (
    <div className={styles.container}>
      <h2>Featured communities</h2>
      <div className={styles.list}>
        {servers && servers.items.map(server => <FeaturedServerCard
          key={server._id}
          server={server}
        />)}
      </div>
      <div className={styles.footer}>
        <img src={compassFooterImg} />
        <span>There are more communities out there!</span>
        <div
          role="button"
          onClick={() => { containerRef.current?.scrollTo(0, 0); }}
        >
          Try searching for them.
        </div>
      </div>
    </div>
  );
}