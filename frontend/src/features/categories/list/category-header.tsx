import type { CategoryData } from '../types';

import { CreateChannelButton } from '@features/channels/create';
import { Tooltip } from '@components/ui/popups';

import { CategoryContextMenuWrapper } from './category-context-menu-wrapper';

import PlusIcon from '@assets/icons/plus.svg?react';
import ChevronIcon from '@assets/icons/chevron.svg?react';

import styles from './category-header.module.scss';

type CategoryHeaderProps = {
  category: CategoryData;
  show: boolean;
  toggleShow: () => void;
};

export function CategoryHeader({ category, show, toggleShow }: CategoryHeaderProps) {
  return (
    <CategoryContextMenuWrapper category={category} className={styles.header}>
      <button onClick={toggleShow} className={styles.showHideButton}>
        <ChevronIcon className={show ? styles.show : styles.hide} />
      </button>
      <h3>{category.name.toUpperCase()}</h3>
      <CreateChannelButton category={category} className={styles.createButton}>
        <Tooltip
          text="Create Channel"
          direction="top"
        >
          <PlusIcon />
        </Tooltip>
      </CreateChannelButton>
    </CategoryContextMenuWrapper>
  );
}