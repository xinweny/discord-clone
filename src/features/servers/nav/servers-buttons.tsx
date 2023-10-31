import { LinkImage } from '@components/ui/links';
import { Tooltip } from '@components/ui/popups';

import { CreateServerButton } from '@features/servers/create';

import CompassIcon from '@assets/icons/compass.svg?react';

import parentStyles from '../joined/joined-servers-navbar.module.scss';
import styles from './servers-buttons.module.scss';

export function ServersButtons() {
  const itemClassName = `${parentStyles.listItem} ${styles.listItem}`;

  return (
    <div className={styles.container}>
      <Tooltip
        text="Add a Server"
        direction="right"
      >
        <div className={itemClassName}>
          <div className={parentStyles.center}>
            <CreateServerButton />
          </div>
        </div>
      </Tooltip>
      <Tooltip
        text="Explore Servers"
        direction="right"
      >
        <div className={itemClassName}>
          <LinkImage href="/servers">
            <div className={parentStyles.center}>
              <CompassIcon width="24" />
            </div>
          </LinkImage>
        </div>
      </Tooltip>
    </div>
  )
}