import type { CategoryData } from '../types';

import { CreateChannelButton } from '@features/channels/create';
import { Tooltip } from '@components/ui/popups';

import { CategoryContextMenuWrapper } from './category-context-menu-wrapper';

type CategoryHeaderProps = {
  category: CategoryData;
};

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <CategoryContextMenuWrapper category={category}>
      <p>{category.name.toUpperCase()}</p>
      <CreateChannelButton category={category}>
        <Tooltip
          text="Create Channel"
          direction="top"
        >
          <img src="#" alt="Create Channel" />
        </Tooltip>
      </CreateChannelButton>
    </CategoryContextMenuWrapper>
  );
}