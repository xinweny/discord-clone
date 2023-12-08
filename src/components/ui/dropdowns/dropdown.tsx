import { createContext } from 'react';

import { type PositionData, useDropdown } from '@components/hooks';

import { ClickPopup } from '../popups';

import { DropdownButton } from './dropdown-button';
import { DropdownMenu } from './dropdown-menu';

type DropdownProps = {
  dropdownButton?: React.ReactNode;
  button?: React.ReactNode;
  children: React.ReactNode;
  position?: PositionData;
};

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function Dropdown({
  button,
  dropdownButton,
  children,
  position = {
    direction: 'bottom',
    align: 'end',
    gap: 8,
  },
}: DropdownProps) {
  const { isOpen, toggle, close } = useDropdown();

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <ClickPopup
        renderPopup={() => (
          <DropdownMenu>
            {children}
          </DropdownMenu>
        )}
        position={position}
      >
        {dropdownButton || <DropdownButton>{button}</DropdownButton>}
      </ClickPopup>
    </DropdownContext.Provider>
  );
}