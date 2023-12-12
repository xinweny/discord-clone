import { ServerData } from '../types';

import styles from './server-header.module.scss';

import { ServerDropdownMenu } from './server-dropdown-menu';

type ServerHeaderProps = {
  server: ServerData;
};

export function ServerHeader({ server }: ServerHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.bannerContainer} id="server-banner-container"></div>
      <h2>{server.name}</h2>
      <ServerDropdownMenu />
    </div>
  );
}