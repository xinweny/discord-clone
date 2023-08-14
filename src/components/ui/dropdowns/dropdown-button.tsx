import { useContext } from 'react';

import { DropdownContext } from '.';

type DropdownButtonProps = {
  children?: React.ReactNode;
};

export function DropdownButton({ children }: DropdownButtonProps) {
  const { isOpen, toggle } = useContext(DropdownContext)!;

  const defaultIcon = isOpen
    ? <img src="#" alt="Close dropdown" />
    : <img src="#" alt="Open dropdown" />;

  return (
    <button onClick={toggle}>
      {children || defaultIcon}
    </button>
  );
}