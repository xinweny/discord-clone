import { useRef } from 'react';

import { Dropdown, DropdownItem } from '@components/ui/dropdowns';
import { CreateChannelButton } from '@features/channels/create';
import { LabelAndIcon } from '@components/ui/presentation';

export function ServerNavDropdown() {
  const createChannelBtnRef = useRef<HTMLButtonElement>(null);
  const createCategoryBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Dropdown>
        <DropdownItem clickRef={createChannelBtnRef}>
          <LabelAndIcon label="Create Channel" icon="#" />
        </DropdownItem>
        <DropdownItem clickRef={createCategoryBtnRef}>
          <LabelAndIcon label="Create Category" icon="#" />
        </DropdownItem>
      </Dropdown>
      <div hidden>
        <CreateChannelButton btnRef={createChannelBtnRef} />
        
      </div>
    </div>
  )
}