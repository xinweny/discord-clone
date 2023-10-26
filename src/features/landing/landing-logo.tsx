import { LinkImage } from '@components/ui/links';

import styles from './landing-logo.module.scss';

import logo from '@assets/static/discord-logo-white.png';

export function LandingLogo() {
  return <LinkImage
    className={styles.logo}
    href="/"
    src={logo}
    alt="Discord Clone"
  />;
}