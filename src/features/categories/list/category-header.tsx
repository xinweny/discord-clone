import type { CategoryData } from '../types';

import { CreateChannelButton } from '@features/channels/create';
import { HoverPopup } from '@components/ui/popups';

import { ContextMenuWrapper } from '@components/wrappers';

type CategoryHeaderProps = {
  category: CategoryData;
};

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <ContextMenuWrapper
      options={[
        {
          label: 'Edit Category',
          action: () => { console.log('EDIT') },
        },
        {
          label: 'Delete Category',
          action: () => { console.log('DELETE') },
        },
      ]}
    >
      <p>{category.name.toUpperCase()}</p>
      <CreateChannelButton category={category}>
        <HoverPopup
          popup={<div>Create Channel</div>}
        >
          <img src="#" alt="Create Channel" />
        </HoverPopup>
      </CreateChannelButton>
    </ContextMenuWrapper>
  );
}