import { useEffect, useState } from 'react';

import { TimestampDict } from '../types';

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

  useEffect(() => {
    if (!channelIds || !lastTimestamps || !readTimestamps) {
      setClsName(noNotifClass);

      return;
    } else {
      for (const channelId of channelIds) {
        const lastDate = lastTimestamps[channelId]
          ? new Date(lastTimestamps[channelId]).getTime()
          : undefined;
    
        if (!lastDate) continue;
    
        const readDate = readTimestamps[channelId]
          ? new Date(readTimestamps[channelId]).getTime()
          : undefined;

        if (readDate) console.log(lastDate, readDate, lastDate > readDate);
    
        if (!readDate || (lastDate > readDate)) {
          setClsName(notifClass);
          return;
        }
      }
    }
  }, [channelIds, lastTimestamps, readTimestamps]);

  return (
    <div className={`${clsName} ${className || ''}`} />
  );
}