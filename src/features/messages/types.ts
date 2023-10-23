export type AttachmentData = {
  _id: string;
  url: string;
  mimetype: string;
  filename: string;
  bytes: number;
};

export type MessageEmojiData = {
  id: string;
  shortcode: string;
  url: string;
  custom: true;
} | {
  id: string;
  shortcode: string;
  url: undefined;
  custom: false;
};

export type MessageData = {
  _id: string;
  roomId: string;
  senderId: string;
  serverId?: string;
  body: string;
  attachments: AttachmentData[];
  emojis: MessageEmojiData[];
  createdAt: string;
  updatedAt?: string;
  sender: {
    avatarUrl: string;
    username: string;
    displayName: string;
  };
  serverMember?: {
    displayName: string;
  };
  type: 'channel' | 'dm';
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
  emojis: MessageEmojiData[];
  isFirst?: boolean;
};

export type EditMessageFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
  body: string;
  emojis: MessageEmojiData[];
};

export type DeleteMessageFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
};

export enum MessageEvent {
  Send = 'message:send',
  Update = 'message:update',
  Delete = 'message:delete',
}