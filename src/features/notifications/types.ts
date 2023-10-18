export type ReadStatusData = {
  _id: string;
  userId: string;
  serverId?: string;
  roomId: string;
  lastReadAt: string;
};

export type ReadStatusDict = {
  [roomId: string]: string;
};

export enum NotificationEvent {
  UpdateReadStatus = 'read_status:update',
}