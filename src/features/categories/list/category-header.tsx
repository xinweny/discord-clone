import type { CategoryData } from '../types';

import { CreateChannelButton } from '@features/channels/create';
import { HoverPopup } from '@components/ui/popups';

import { CategoryContextMenuWrapper } from './category-context-menu-wrapper';

type CategoryHeaderProps = {
  category: CategoryData;
};

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <CategoryContextMenuWrapper category={category}>
      <p>{category.name.toUpperCase()}</p>
      <CreateChannelButton category={category}>
        <HoverPopup
          popup={<div>Create Channel</div>}
        >
          <img src="#" alt="Create Channel" />
        </HoverPopup>
      </CreateChannelButton>
    </CategoryContextMenuWrapper>
  );
}