import { useContext } from 'react';
import { ClickAwayListener } from '@mui/material';

import { DropdownContext } from '.';

type DropdownMenuProps = {
  children: React.ReactNode;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  const { isOpen, close } = useContext(DropdownContext)!;

  return (isOpen && (
    <ClickAwayListener onClickAway={close}>
      <ul>
        {children}
      </ul>
    </ClickAwayListener>
  ));
}