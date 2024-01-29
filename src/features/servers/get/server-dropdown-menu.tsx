import { useRef } from 'react';

import { useServerMemberContext } from '@features/members/context';

import { useServerAuthorize } from '@features/servers/hooks';

import { Dropdown, DropdownItem } from '@components/ui/dropdowns';

import { CreateChannelButton } from '@features/channels/create';
import { CreateCategoryButton } from '@features/categories/create';
import { ServerSettingsButton } from '../settings';
import { LeaveServerButton } from '@features/members/delete';
import { InviteFriendsButton } from '@features/members/create';

import AddUserIcon from '@assets/icons/add-user.svg?react';
import PlusCircle from '@assets/icons/plus-circle.svg?react';
import AddFolderIcon from '@assets/icons/add-folder.svg?react';
import GearIcon from '@assets/icons/gear.svg?react';
import LeaveIcon from '@assets/icons/leave.svg?react';

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
          label="Invite People"
          color="blue"
          icon={<AddUserIcon />}
        />
        <DropdownItem
          clickRef={createChannelBtnRef}
          authorized={authorized}
          label="Create Channel"
          icon={<PlusCircle />}
        />
        <DropdownItem
          clickRef={createCategoryBtnRef}
          authorized={authorized}
          label="Create Category"
          icon={<AddFolderIcon />}
        />
        <DropdownItem
          clickRef={serverSettingsBtnRef}
          authorized={authorized}
          label="Server Settings"
          icon={<GearIcon />}
        />
        <DropdownItem
          clickRef={leaveServerBtnRef}
          label="Leave Server"
          icon={<LeaveIcon />}
          color="red"
        />
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