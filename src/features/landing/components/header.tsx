import { RestrictedLinkButton } from '@common/components/ui';
import { LandingLogo } from './landing-logo';

export function Header() {
  return (
    <header>
      <LandingLogo />
      <div>
        <a href="">Demo</a>
        <a href="">Source Code</a>
      </div>
      <RestrictedLinkButton to="/login">Login</RestrictedLinkButton>
    </header>
  );
}