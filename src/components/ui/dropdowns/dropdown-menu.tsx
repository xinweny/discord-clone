import { useContext } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { DropdownContext } from '.';

type DropdownMenuProps = {
  children: React.ReactNode;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  const { isOpen, close } = useContext(DropdownContext)!;
  const ref = useClickAway<HTMLUListElement>(close);

  return (isOpen && (
    <ul ref={ref}>
      {children}
    </ul>
  ));
}