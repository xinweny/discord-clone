export type AttachmentData = {
  _id: string;
  url: string;
  mimetype: string;
  filename: string;
  bytes: number;
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
    displayName: string;
  };
  type: 'channel' | 'dm';
};

export type GetMessagesQuery = {
  serverId?: string;
  roomId: string;
  next?: string | null;
};

export type CreateMessageFields = {
  serverId?: string;
  roomId: string;
  body: string;
  attachments: File[];
};

export type SendMessageFields = {
  serverId?: string;
  roomId: string;
  senderId: string;
  attachments: File[];
  body: string;
};

export type EditMessageFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
  body: string;
};

export type DeleteMessageFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
};