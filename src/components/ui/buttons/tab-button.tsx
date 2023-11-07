import { ActiveIdState } from '@hooks';

import styles from './tab-button.module.scss';

type TabButtonProps = {
  tab: string;
  children: React.ReactNode;
  className?: string;
} & ActiveIdState;

export function TabButton({
  set, id, tab, children, className
}: TabButtonProps) {
  return (
    <button
      className={`${styles.button} ${id === tab ? styles.active : ''} ${className || ''}`}
      onClick={() => { set(tab); }}
    >
      {children}
    </button>
  )
}