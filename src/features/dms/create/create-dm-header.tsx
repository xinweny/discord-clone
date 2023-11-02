import { CreateDmButton } from './create-dm-button';

import PlusIcon from '@assets/icons/plus.svg?react';

import styles from './create-dm-header.module.scss';

export function CreateDmHeader() {
  return (
    <div className={styles.header}>
      <p>DIRECT MESSAGES</p>
      <CreateDmButton>
        <PlusIcon width="18px" height="18px" />
      </CreateDmButton>
    </div>
  );
}