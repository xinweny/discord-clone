export type AttachmentData = {
  _id: string;
  url: string;
  mimetype: string;
  filename: string;
  bytes: number;
};

export type MessageEmojiDict = {
  [key: string]: {
    shortcode: string;
    url?: string;
  }
};

export type MessageData = {
  _id: string;
  roomId: string;
  senderId: string;
  serverId?: string;
  body: string;
  attachments: AttachmentData[];
  createdAt: string;
  updatedAt?: string;
  sender: {
    avatarUrl: string;
    username: string;
    displayName: string;
  };
  serverMember?: {
    _id: string;
    displayName: string;
  };
  type: 'channel' | 'dm';
  emojis: MessageEmojiDict;
};

export type GetMessagesQuery = {
  serverId?: string;
  roomId: string;
  next?: string | null;
};

export type SendMessageFields = {
  serverId?: string;
  roomId: string;
  attachments: File[];
  body: string;
  next?: string | null | undefined;
};

export type EditMessageFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
  body: string;
  next?: string | null | undefined;
};

export type DeleteMessageFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
  next?: string | null | undefined;
};

export enum MessageEvent {
  Send = 'message:send',
  Update = 'message:update',
  Delete = 'message:delete',
}