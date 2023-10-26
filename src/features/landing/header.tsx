import { RestrictedLinkButton } from '@components/ui/links';
import { LandingLogo } from './landing-logo';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <LandingLogo />
      <div>
        <a href="">Demo</a>
        <a href="">Source Code</a>
      </div>
      <RestrictedLinkButton to="/login">Login</RestrictedLinkButton>
    </header>
  );
}