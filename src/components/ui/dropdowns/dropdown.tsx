import { createContext } from 'react';

import { useDropdown } from '@hooks';

import { DropdownButton } from '../buttons';
import { DropdownMenu } from './dropdown-menu';

type DropdownProps = {
  button?: React.ReactNode;
  children: React.ReactNode;
};

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function Dropdown({ button, children }: DropdownProps) {
  const { isOpen, toggle, close } = useDropdown();

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div>
        {button
          ? <DropdownButton>{button}</DropdownButton>
          : <DropdownButton />
        }
        <DropdownMenu>
          {children}
        </DropdownMenu>
      </div>
    </DropdownContext.Provider>
  );
}