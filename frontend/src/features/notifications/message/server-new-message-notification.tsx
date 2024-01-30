import { useEffect, useState } from 'react';

import { TimestampDict } from '../types';

import { useHasNewMessage } from '../hooks';

export type ServerNewMessageNotificationProps = {
  channelIds?: string[];
  lastTimestamps?: TimestampDict;
  readTimestamps?: TimestampDict;
  className?: string;
  noNotifClass?: string;
  notifClass?: string;
};

export function ServerNewMessageNotification({
  channelIds,
  lastTimestamps,
  readTimestamps,
  className,
  noNotifClass = '',
  notifClass = '',
}: ServerNewMessageNotificationProps) {
  const [clsName, setClsName] = useState<string>(noNotifClass);

  const hasNewMessage = useHasNewMessage(channelIds, lastTimestamps, readTimestamps);

  useEffect(() => {
    setClsName(hasNewMessage ? notifClass : noNotifClass);
  }, [hasNewMessage]);

  return (
    <div className={`${clsName} ${className || ''}`} />
  );
}