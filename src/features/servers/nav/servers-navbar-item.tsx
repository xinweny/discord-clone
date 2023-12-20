import { Tooltip } from '@components/ui/popups';

import styles from './servers-navbar-item.module.scss';

type ServersNavbarItemProps = {
  isActive: boolean;
  tooltipText: string;
  children: React.ReactNode;
  className?: string;
  notification?: React.ReactNode | null;
};

export function ServersNavbarItem({
  isActive,
  tooltipText,
  children,
  className,
  notification,
}: ServersNavbarItemProps) {
  return (
    <Tooltip
      text={tooltipText}
      direction="right"
      gap={16}
    >
      <div className={`${styles.item} ${isActive ? styles.active : ''} ${className || ''}`}>
        {children}
        <div className={styles.indicator}>
          {notification}
        </div>
      </div>
    </Tooltip>
  );
}