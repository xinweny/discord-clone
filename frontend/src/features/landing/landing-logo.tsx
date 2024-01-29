import { LinkImage } from '@components/ui/links';

import styles from './landing-logo.module.scss';

import logo from '@assets/static/discord-logo-white.png';

export function LandingLogo() {
  return (
    <LinkImage href="/">
      <img
        className={styles.logo}
        src={logo}
        alt="Discord Clone"
      />
    </LinkImage>
  );
}