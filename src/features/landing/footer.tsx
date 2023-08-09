import { LinkImage } from '@components/ui/links';

import { LandingLogo } from './landing-logo';

export function Footer() {
  const ghUrl = 'https://github.com/xinweny';

  return (
    <footer>
      <LandingLogo />
      <div>
        <p>Made by <strong><a href={ghUrl}>xinweny</a></strong> in 2023</p>
        <LinkImage href={ghUrl} src="#" alt="Link to xinweny GitHub profile" />
      </div>
    </footer>
  );
}