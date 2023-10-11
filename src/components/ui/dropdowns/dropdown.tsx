import { createContext } from 'react';

import { useDropdown } from '@components/hooks';

import { DropdownButton } from './dropdown-button';
import { DropdownMenu } from './dropdown-menu';

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

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div>
        {dropdownButton || <DropdownButton>{button}</DropdownButton>}
        <DropdownMenu>
          {children}
        </DropdownMenu>
      </div>
    </DropdownContext.Provider>
  );
}