import { useRef } from 'react';

import { Dropdown, DropdownItem } from '@components/ui/dropdowns';
import { CreateChannelButton } from '../channels/create';
import { LabelAndIcon } from '@components/ui/presentation';

export function ServerNavDropdown() {
  const createChannelBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Dropdown>
        <DropdownItem clickRef={createChannelBtnRef}>
          <LabelAndIcon label="Create Channel" icon="#" />
        </DropdownItem>
      </Dropdown>
      <div>
        <CreateChannelButton btnRef={createChannelBtnRef} hidden />
      </div>
    </div>
  )
}