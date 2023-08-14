import { useRef } from 'react';

import { useServerAuthorize } from '@hooks';

import { Dropdown, DropdownItem } from '@components/ui/dropdowns';
import { LabelAndIcon } from '@components/ui/presentation';

import { CreateChannelButton } from '@features/channels/create';
import { CreateCategoryButton } from '@features/categories/create';
import { ServerSettingsButton } from '../settings';

export function ServerNavDropdown() {
  const createChannelBtnRef = useRef<HTMLButtonElement>(null);
  const createCategoryBtnRef = useRef<HTMLButtonElement>(null);
  const serverSettingsBtnRef = useRef<HTMLButtonElement>(null);

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
        <DropdownItem
          clickRef={serverSettingsBtnRef}
          authorized={authorized}
        >
          <LabelAndIcon label="Server Settings" icon="#" />
        </DropdownItem>
      </Dropdown>
      <div>
        <CreateChannelButton btnRef={createChannelBtnRef} hidden />
        <CreateCategoryButton btnRef={createCategoryBtnRef} hidden />
        <ServerSettingsButton btnRef={serverSettingsBtnRef} hidden />
      </div>
    </div>
  )
}