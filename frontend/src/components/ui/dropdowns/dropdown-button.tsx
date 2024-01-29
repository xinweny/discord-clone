import { useContext } from 'react';

import { DropdownContext } from '.';

import ChevronIcon from '@assets/icons/chevron.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './dropdown-button.module.scss';

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
    ? closeComponent || <CrossIcon className={styles.icon} />
    : openComponent || <ChevronIcon className={styles.icon} />;

  return (
    <button onClick={toggle} className={styles.button}>
      {children || toggleIcon}
    </button>
  );
}