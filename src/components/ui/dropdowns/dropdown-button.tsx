import { useContext } from 'react';

import { DropdownContext } from '.';

type DropdownButtonProps = {
  children?: React.ReactNode;
  openComponent?: React.ReactNode;
  closeComponent?: React.ReactNode;
};

export function DropdownButton({
  children,
  openComponent,
  closeComponent,
}: DropdownButtonProps) {
  const { isOpen, toggle } = useContext(DropdownContext)!;

  const toggleIcon = isOpen
    ? closeComponent || <img src="#" alt="Close dropdown" />
    : openComponent || <img src="#" alt="Open dropdown" />;

  return (
    <button onClick={toggle}>
      {children || toggleIcon}
    </button>
  );
}