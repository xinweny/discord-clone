import { useContext } from 'react';

import { DropdownContext } from '.';

type DropdownItemProps = {
  children: React.ReactNode;
  clickRef: React.RefObject<HTMLButtonElement>;
};

export function DropdownItem({
  children,
  clickRef,
}: DropdownItemProps) {
  const { close } = useContext(DropdownContext)!;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (clickRef) clickRef.current?.click();
    close();
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}