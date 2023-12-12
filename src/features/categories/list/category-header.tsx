import type { CategoryData } from '../types';

import { CreateChannelButton } from '@features/channels/create';
import { Tooltip } from '@components/ui/popups';

import { CategoryContextMenuWrapper } from './category-context-menu-wrapper';

import PlusIcon from '@assets/icons/plus.svg?react';

import styles from './category-header.module.scss';

type CategoryHeaderProps = {
  category: CategoryData;
};

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <CategoryContextMenuWrapper category={category} className={styles.header}>
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