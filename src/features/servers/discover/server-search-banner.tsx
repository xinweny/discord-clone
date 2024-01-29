import { ServerSearchForm } from '@features/servers/discover';

import background from '@assets/static/discovery-banner.svg';

import styles from './server-search-banner.module.scss';

export function ServerSearchBanner() {
  return (
    <div className={styles.banner}>
      <img className={styles.background} src={background} />
      <div>
        <h1>Find your community on DiscordClone</h1>
        <span>From gaming, to music, to learning, there's a place for you.</span>
        <ServerSearchForm />
      </div>
    </div>
  );
}