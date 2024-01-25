import { Tooltip } from '@components/ui/popups';

import {
  ServerNewMessageNotification,
  type ServerNewMessageNotificationProps,
} from '@features/notifications/message';

import styles from './servers-navbar-item.module.scss';

type ServersNavbarItemProps = {
  isActive: boolean;
  tooltipText: string;
  children: React.ReactNode;
  className?: string;
  notificationProps?: ServerNewMessageNotificationProps;
};

export function ServersNavbarItem({
  isActive,
  tooltipText,
  children,
  className,
  notificationProps,
}: ServersNavbarItemProps) {
  return (
    <Tooltip
      text={tooltipText}
      direction="right"
      gap={16}
    >
      <div className={`${styles.item} ${isActive ? styles.active : ''} ${className || ''}`}>
        {children}
        <ServerNewMessageNotification
          {...notificationProps}
          className={styles.indicator}
          notifClass={notificationProps ? styles.notification : ''}
        />
      </div>
    </Tooltip>
  );
}