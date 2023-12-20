import { TimestampDict } from '../types';

import styles from './server-new-message-notification.module.scss';

type ServerNewMessageNotificationProps = {
  channelIds: string[];
  lastTimestamps: TimestampDict;
  readTimestamps: TimestampDict;
  className?: string;
};

export function ServerNewMessageNotification({
  channelIds,
  lastTimestamps,
  readTimestamps,
  className,
}: ServerNewMessageNotificationProps) {
  const notification = <div className={`${styles.notification} ${className || ''}`}></div>;

  for (const channelId of channelIds) {
    const lastDate = lastTimestamps[channelId] ? new Date(lastTimestamps[channelId]).getTime() : undefined;

    if (!lastDate) continue;

    const readDate = readTimestamps[channelId] ? new Date(readTimestamps[channelId]).getTime() : undefined;

    if (!readDate || (lastDate > readDate)) return notification;
  }

  return null;
}