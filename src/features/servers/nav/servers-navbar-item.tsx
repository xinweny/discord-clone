import { Tooltip } from '@components/ui/popups';

import styles from './servers-navbar-item.module.scss';

type ServersNavbarItemProps = {
  isActive: boolean;
  tooltipText: string;
  children: React.ReactNode;
  className?: string;
};

export function ServersNavbarItem({
  isActive,
  tooltipText,
  children,
  className
}: ServersNavbarItemProps) {
  return (
    <Tooltip
      text={tooltipText}
      direction="right"
      options={{ gap: '16px' }}
    >
      <div className={`${styles.item} ${isActive ? styles.active : ''} ${className || ''}`}>
        {children}
      </div>
    </Tooltip>
  );
}