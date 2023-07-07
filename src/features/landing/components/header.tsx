import { HeaderButton } from './header-button';
import { LandingLogo } from './landing-logo';

export const Header = () => {
  return (
    <header>
      <LandingLogo />
      <div>
        <a href="">Demo</a>
        <a href="">Source Code</a>
      </div>
      <HeaderButton />
    </header>
  );
};