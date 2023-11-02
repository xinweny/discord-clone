import { LinkImage } from '@components/ui/links';

import { CreateServerButton } from '@features/servers/create';

import { ServersNavbarItem } from '.';

import CompassIcon from '@assets/icons/compass.svg?react';

import styles from './servers-buttons.module.scss';

export function ServersButtons() {
  return (
    <div className={styles.container}>
      <ServersNavbarItem
        tooltipText="Add a Server"
        isActive={false}
        className={styles.item}
      >
        <CreateServerButton />
      </ServersNavbarItem>
      <ServersNavbarItem
        tooltipText="Explore Servers"
        isActive={false}
        className={styles.item}
      >
        <LinkImage href="/servers">
          <CompassIcon width="24" />
        </LinkImage>
      </ServersNavbarItem>
    </div>
  )
}