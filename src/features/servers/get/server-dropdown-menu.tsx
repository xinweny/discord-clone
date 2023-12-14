import { useRef } from 'react';

import { useServerMemberContext } from '@features/members/context';

import { useServerAuthorize } from '@features/servers/hooks';

import { Dropdown, DropdownItem } from '@components/ui/dropdowns';
import { LabelAndIcon } from '@components/ui/presentation';

import { CreateChannelButton } from '@features/channels/create';
import { CreateCategoryButton } from '@features/categories/create';
import { ServerSettingsButton } from '../settings';
import { LeaveServerButton } from '@features/members/delete';
import { InviteFriendsButton } from '@features/members/create';

export function ServerDropdownMenu() {
  const createChannelBtnRef = useRef<HTMLButtonElement>(null);
  const createCategoryBtnRef = useRef<HTMLButtonElement>(null);
  const serverSettingsBtnRef = useRef<HTMLButtonElement>(null);
  const leaveServerBtnRef = useRef<HTMLButtonElement>(null);
  const inviteFriendsBtnRef = useRef<HTMLButtonElement>(null);

  const authorized = useServerAuthorize('manageChannels');
  const member = useServerMemberContext();

  if (!member) return null;

  return (
    <div>
      <Dropdown>
        <DropdownItem
          clickRef={inviteFriendsBtnRef}
        >
          <LabelAndIcon label="Invite People" icon="#" />
        </DropdownItem>
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
        <DropdownItem
          clickRef={leaveServerBtnRef}
        >
          <LabelAndIcon label="Leave Server" icon="#" />
        </DropdownItem>
      </Dropdown>
      <>
        <CreateChannelButton btnRef={createChannelBtnRef} hidden />
        <CreateCategoryButton btnRef={createCategoryBtnRef} hidden />
        <ServerSettingsButton btnRef={serverSettingsBtnRef} hidden />
        <LeaveServerButton btnRef={leaveServerBtnRef} hidden />
        <InviteFriendsButton btnRef={inviteFriendsBtnRef} hidden />
      </>
    </div>
  )
}