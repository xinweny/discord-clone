import { CategoryData } from '../api';

import { CreateChannelButton } from '@features/server/channels/create';
import { HoverPopup } from '@components/ui';

type CategoryGroupProps = {
  category: CategoryData;
  children: React.ReactNode;
};

export function CategoryGroup({
  category, children,
}: CategoryGroupProps) {


  return (
    <div>
      <div>
        <p>{category.name.toUpperCase()}</p>
        <CreateChannelButton category={category}>
          <HoverPopup
            popup={<div>Create Channel</div>}
          >
            <img src="#" alt="Create Channel" />
          </HoverPopup>
        </CreateChannelButton>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}