import { LinkButton } from '@common/components/ui';

import { LandingLogo } from './landing-logo';

export const Header = () => {
  return (
    <header>
      <LandingLogo />
      <div>
        <a href="">Demo</a>
        <a href="">Source Code</a>
      </div>
      <LinkButton to="">Login</LinkButton>
    </header>
  );
};