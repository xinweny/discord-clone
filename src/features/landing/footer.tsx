import { LinkImage } from '@components/ui/links';

import { LandingLogo } from './landing-logo';

import styles from './footer.module.scss';

import githubLogo from '@assets/icons/github-white.svg';

export function Footer() {
  const ghUrl = 'https://github.com/xinweny';

  return (
    <footer className={styles.footer}>
      <div>
        <LandingLogo />
        <div className={styles.content}>
          <p>Made by <strong><a href={ghUrl}>xinweny</a></strong> in 2023</p>
          <LinkImage href={`${ghUrl}/discord-clone-frontend`}>
            <img src={githubLogo} alt="Source code" />
          </LinkImage>
        </div>
      </div>
    </footer>
  );
}