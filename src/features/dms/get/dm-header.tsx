import type { DMData } from '../types';

import { DmHeaderContext } from '../context';

import { DmHeaderInfo } from './dm-header-info';
import { DmHeaderButtons } from './dm-header-buttons';

import styles from './dm-header.module.scss';

type DmHeaderProps = {
  dm: DMData;
};

export function DmHeader({ dm }: DmHeaderProps) {
  const contextData = {
    tooltipProps: {
      direction: 'bottom' as const,
      options: { gap: 2 },
    },
  };

  return (
    <DmHeaderContext.Provider value={contextData}>
      <div className={styles.header}>
        <DmHeaderInfo dm={dm} />
        <DmHeaderButtons dm={dm} />
      </div>
    </DmHeaderContext.Provider>
  );
}