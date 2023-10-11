import { useContext } from 'react';

import { DropdownContext } from '.';

type DropdownItemProps = {
  children: React.ReactNode;
  clickRef?: React.RefObject<HTMLButtonElement>;
  authorized?: boolean;
  onClick?: () => void;
};

export function DropdownItem({
  children,
  clickRef,
  authorized = true,
  onClick,
}: DropdownItemProps) {
  const { close } = useContext(DropdownContext)!;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (clickRef) clickRef.current?.click();
    if (onClick) onClick();

    close();
  };

  if (!authorized) return null;

  return (
    <li>
      <button onClick={handleClick}>
        {children}
      </button>
    </li>
  );
}