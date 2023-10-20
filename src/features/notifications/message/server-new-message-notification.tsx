import { TimestampDict } from '../types';

type ServerNewMessageNotificationProps = {
  channelIds: string[];
  lastTimestamps: TimestampDict;
  readTimestamps: TimestampDict;
};

export function ServerNewMessageNotification({
  channelIds,
  lastTimestamps,
  readTimestamps,
}: ServerNewMessageNotificationProps) {
  const notification = <img src="#" alt="New" />;

  for (const channelId of channelIds) {
    const lastDate = lastTimestamps[channelId] ? new Date(lastTimestamps[channelId]).getTime() : undefined;

    if (!lastDate) continue;

    const readDate = readTimestamps[channelId] ? new Date(readTimestamps[channelId]).getTime() : undefined;

    if (!readDate || (lastDate > readDate)) return notification;
  }

  return null;
}