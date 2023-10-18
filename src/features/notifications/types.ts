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

export type UnreadCountData = {
  roomId: string;
  count: number;
};

export type UnreadCountDict = {
  [roomId: string]: number;
};

export enum NotificationEvent {
  UpdateReadStatus = 'read_status:update',
  NewUnreadMessage = 'message:new',
}