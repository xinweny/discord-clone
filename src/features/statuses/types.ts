export enum StatusEvent {
  Get = 'user_status:get',
}

export type GetStatusEventPayload = {
  userId: string;
  status: boolean;
};

export type UserStatusesData = {
  [key: string]: boolean;
};