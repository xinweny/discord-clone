import { RestrictedLinkButton } from '@components/ui/links';
import { DemoButton } from './demo-button';

import styles from './headline-banner.module.scss';

export function HeadlineBanner() {
  return (
    <div className={styles.headlineBannerContainer}>
      <div className={styles.headlineBanner}>
        <h1>IMAGINE A PLACE...</h1>
        <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
        <RestrictedLinkButton to="/register">Sign up</RestrictedLinkButton>
        <DemoButton />
      </div>
    </div>
  );
}