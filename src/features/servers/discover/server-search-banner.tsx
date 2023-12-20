import { ServerSearchForm } from '@features/servers/discover';

import styles from './server-search-banner.module.scss';

export function ServerSearchBanner() {
  return (
    <div className={styles.banner}>
      <h2>Find your community on DiscordClone</h2>
      <p>From gaming, to music, to learning, there's a place for you.</p>
      <ServerSearchForm />
    </div>
  );
}