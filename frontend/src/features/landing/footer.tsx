import { LinkImage } from '@components/ui/links';

import { LandingLogo } from './landing-logo';

import GithubIcon from '@assets/icons/github.svg?react';

import styles from './footer.module.scss';

export function Footer() {
  const ghUrl = 'https://github.com/xinweny';

  return (
    <footer className={styles.footer}>
      <div>
        <LandingLogo />
        <div className={styles.content}>
          <p>Made by <a href={ghUrl} className={styles.githubLink}>xinweny</a> in 2023</p>
          <LinkImage href={`${ghUrl}/discord-clone-frontend`}>
            <GithubIcon />
          </LinkImage>
        </div>
      </div>
      <p className={styles.disclaimer}><span>DISCLAIMER:</span> This personal project is made solely for educational purposes with the intent to demonstrate my skills as a Full Stack JS Developer. This project has no affiliation with Discord Inc. or any of their related and/or associated companies. I do not not make any warranty or representation, and disclaim all liabilities, including but not limited to the loss of data, that may arise from the use of this project.</p>
    </footer>
  );
}