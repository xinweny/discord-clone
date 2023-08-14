import { useRef } from 'react';

import { Dropdown, DropdownItem } from '@components/ui/dropdowns';
import { LabelAndIcon } from '@components/ui/presentation';

import { CreateChannelButton } from '@features/channels/create';
import { CreateCategoryButton } from '@features/categories/create';
import { useServerAuthorize } from '@hooks';

export function ServerNavDropdown() {
  const createChannelBtnRef = useRef<HTMLButtonElement>(null);
  const createCategoryBtnRef = useRef<HTMLButtonElement>(null);

  const authorized = useServerAuthorize('manageChannels');

  return (
    <div>
      <Dropdown>
        <DropdownItem
          clickRef={createChannelBtnRef}
          authorized={authorized}
        >
          <LabelAndIcon label="Create Channel" icon="#" />
        </DropdownItem>
        <DropdownItem
          clickRef={createCategoryBtnRef}
          authorized={authorized}
        >
          <LabelAndIcon label="Create Category" icon="#" />
        </DropdownItem>
      </Dropdown>
      <div>
        <CreateChannelButton btnRef={createChannelBtnRef} hidden />
        <CreateCategoryButton btnRef={createCategoryBtnRef} hidden />
      </div>
    </div>
  )
}