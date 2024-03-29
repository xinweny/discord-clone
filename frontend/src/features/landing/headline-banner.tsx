import { RestrictedLinkButton } from '@components/ui/links';
import { DemoButton } from './demo-button';

import backgroundImage from '@assets/static/cta-background.svg';
import leftForeground from '@assets/static/cta-foreground-left.svg';
import rightForeground from '@assets/static/cta-foreground-right.svg';

import styles from './headline-banner.module.scss';

export function HeadlineBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <div>
            <h1>DISCORD CLONE</h1>
            <p>A place where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
          </div>
          <div className={styles.buttons}>
            <RestrictedLinkButton className={styles.signupButton} to="/register">Sign up</RestrictedLinkButton>
            <DemoButton className={styles.demoButton} />
          </div>
        </div>
      </div>
      <div className={styles.images}>
        <img className={styles.background} src={backgroundImage} alt="" />
        <img className={styles.foregroundLeft} src={leftForeground} alt="" />
        <img className={styles.foregroundRight} src={rightForeground} alt="" />
      </div>
    </div>
  );
}