import { useRef } from 'react';

import { Popout } from '@components/ui/popups';
import { AddRolePopup } from './add-role-popup';

type AddRolesButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function AddRolesButton({
  children,
  className,
}: AddRolesButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Popout
      renderPopup={() => <AddRolePopup btnRef={btnRef} />}
      position={{
        direction: 'bottom',
        align: 'center',
        gap: 8,
      }}
      className={className}
    >
      {children}
    </Popout>
  );
}