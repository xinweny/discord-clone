import { LinkImage } from '@common/components/ui';

import { LandingLogo } from './landing-logo';

const GHLINK = 'https://github.com/xinweny';

export const Footer = () => {
  return (
    <footer>
      <LandingLogo />
      <div>
        <p>Made by <strong><a href={GHLINK}>xinweny</a></strong> in 2023</p>
        <LinkImage href={GHLINK} src="#" alt="Link to xinweny GitHub profile" />
      </div>
    </footer>
  );
};