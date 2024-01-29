import { useContext } from 'react';

import { DropdownContext } from '.';

import styles from './dropdown-menu.module.scss';

type DropdownMenuProps = {
  children: React.ReactNode;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  const { isOpen } = useContext(DropdownContext)!;

  if (!isOpen) return null;

  return (
    <ul className={styles.menu}>
      {children}
    </ul>
  );
}