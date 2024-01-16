import { useRef } from 'react';

import type { RoleData } from '../types';

import { useServerAuthorize } from '@features/servers/hooks';

import { type ContextMenuOptionsData, ContextMenuWrapper } from '@components/ui/context-menu';
import { Tooltip } from '@components/ui/popups';

import { DeleteRoleButton } from '../delete';

import EllipsisIcon from '@assets/icons/ellipsis.svg?react';

import styles from './role-context-menu-button.module.scss';

type RoleContextMenuButtonProps = {
  serverRole: RoleData;
  isShown: boolean;
};

export function RoleContextMenuButton({
  serverRole,
  isShown,
}: RoleContextMenuButtonProps) {
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const options = [
    {
      label: 'Delete Role',
      action: () => {
        if (deleteBtnRef) deleteBtnRef.current?.click();
      },
      type: 'danger',
    },
  ] as ContextMenuOptionsData[];

  const authorized = useServerAuthorize('manageRoles');

  if (!authorized) return null;

  return (
    <>
      <ContextMenuWrapper
        options={options}
        mode="onClick"
      >
        <Tooltip text="More" direction="top" gap={4}>
          <div className={`${styles.button} ${isShown ? styles.hovered : ''}`}>
            <EllipsisIcon />
          </div>
        </Tooltip>
      </ContextMenuWrapper>
      <DeleteRoleButton
        btnRef={deleteBtnRef}
        serverRole={serverRole}
        hidden
      />
    </>
  );
}