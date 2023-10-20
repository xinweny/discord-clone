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

    if (channelId === '64bab875ef8b7afc01b1d6e9') console.log('last message: ', lastDate);

    if (!lastDate) continue;

    const readDate = readTimestamps[channelId] ? new Date(readTimestamps[channelId]).getTime() : undefined;

    if (channelId === '64bab875ef8b7afc01b1d6e9') console.log('last read: ', readDate);

    if (!readDate || (lastDate > readDate)) return notification;
  }

  return null;
}