export type ReadStatusData = {
  _id: string;
  userId: string;
  serverId?: string;
  roomId: string;
  lastReadAt: string;
};

export type LastTimestampData = {
  roomId: string;
  lastAt: string;
};

export type TimestampDict = {
  [roomId: string]: string;
};

export enum NotificationEvent {
  UpdateReadStatus = 'read_status:update',
}