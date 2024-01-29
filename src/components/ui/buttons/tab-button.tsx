import { ActiveIdState } from '@hooks';

import styles from './tab-button.module.scss';

type TabButtonProps = {
  tab: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
} & ActiveIdState;

export function TabButton({
  set,
  id,
  tab,
  children,
  className,
  activeClassName,
}: TabButtonProps) {
  return (
    <button
      className={`${styles.button} ${id === tab
        ? (activeClassName || styles.active)
        : ''} ${className || ''}`}
      onClick={() => { set(tab); }}
    >
      {children}
    </button>
  )
}