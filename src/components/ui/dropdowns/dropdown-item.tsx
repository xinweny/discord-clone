import { useContext } from 'react';

import { DropdownContext } from '.';

import styles from './dropdown-item.module.scss';

type DropdownItemProps = {
  clickRef?: React.RefObject<HTMLButtonElement>;
  authorized?: boolean;
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
  color?: 'red' | 'blue';
};

export function DropdownItem({
  label,
  icon,
  clickRef,
  authorized = true,
  onClick,
  color,
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
    <li className={styles.item}>
      <button onClick={handleClick} className={color && styles[color]}>
        <span>{label}</span>
        {icon}
      </button>
    </li>
  );
}