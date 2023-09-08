import { useRef } from 'react';

import type { RoleData } from '../types';

import { useServerAuthorize } from '@features/servers/hooks';

import { ContextMenuWrapper } from '@components/wrappers';

import { DeleteRoleButton } from '../delete';

type RoleContextMenuButtonProps = {
  serverRole: RoleData;
};

export function RoleContextMenuButton({
  serverRole,
}: RoleContextMenuButtonProps) {
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const options = [
    {
      label: 'Delete Role',
      action: () => {
        if (deleteBtnRef) deleteBtnRef.current?.click();
      },
    },
  ];

  const authorized = useServerAuthorize('manageRoles');

  if (!authorized) return null;

  return (
    <>
      <ContextMenuWrapper options={options} mode="onClick">
        <div>
          <img src="#" alt="Context Menu" />
        </div>
      </ContextMenuWrapper>
      <div>
        <DeleteRoleButton
          btnRef={deleteBtnRef}
          serverRole={serverRole}
          hidden
        />
      </div>
    </>
  );
}