import { createContext } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { useDropdown } from '@components/hooks';

import { DropdownButton } from './dropdown-button';
import { DropdownMenu } from './dropdown-menu';

import styles from './dropdown.module.scss';

type DropdownProps = {
  dropdownButton?: React.ReactNode;
  button?: React.ReactNode;
  children: React.ReactNode;
};

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function Dropdown({ button, dropdownButton, children }: DropdownProps) {
  const { isOpen, toggle, close } = useDropdown();

  const ref = useClickAway<HTMLDivElement>(close);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={ref} className={styles.dropdown}>
        {dropdownButton || <DropdownButton>{button}</DropdownButton>}
        <DropdownMenu>
          {children}
        </DropdownMenu>
      </div>
    </DropdownContext.Provider>
  );
}