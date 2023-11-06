import { CreateDmButton } from './create-dm-button';

import PlusIcon from '@assets/icons/plus.svg?react';

import styles from './create-dm-header.module.scss';
import { Tooltip } from '@components/ui/popups';

export function CreateDmHeader() {
  return (
    <div className={styles.header}>
      <p>DIRECT MESSAGES</p>
      <Tooltip
        text="Create DM"
        direction="top"
        options={{ gap: 4 }}
      >
        <CreateDmButton>
          <PlusIcon width="18px" height="18px" />
        </CreateDmButton>
      </Tooltip>
    </div>
  );
}