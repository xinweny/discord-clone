import { RestrictedLinkButton } from '@components/ui/links';

import benefit4 from '@assets/static/benefit_4.svg';
import sparkles from '@assets/static/sparkles.svg';

import styles from './cta-banner.module.scss';

export function CTABanner() {
  return (
    <div className={styles.ctaBanner}>
      <div className={styles.benefit}>
        <h2>RELIABLE TECH FOR STAYING CLOSE</h2>
        <p>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</p>
        <img src={benefit4} alt="" />
      </div>
      <div className={styles.finalMessage}>
        <img src={sparkles} />
        <h3>Ready to start your journey?</h3>
        <RestrictedLinkButton to="/register">Sign Up Now</RestrictedLinkButton>
      </div>
    </div>
  );
}