import { FeaturedServerCard } from './featured-server-card';

import { useGetPublicServersQuery } from '../api';

import styles from './featured-servers-container.module.scss';

type FeaturedServersContainerProps = {
  query?: string;
};

export function FeaturedServersContainer({
  query = '',
}: FeaturedServersContainerProps) {
  const { data: servers } = useGetPublicServersQuery(query);

  return (
    <div className={styles.container}>
      <h2>Featured communities</h2>
      <div className={styles.list}>
        {servers && servers.items.map(server => <FeaturedServerCard
          key={server._id}
          server={server}
        />)}
      </div>
    </div>
  );
}