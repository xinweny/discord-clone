export type CustomEmojiData = {
  _id: string;
  creatorId: string;
  name: string;
  url: string;
  creator?: {
    _id: string;
    username: string;
    avatarUrl: string;
  };
};

export type GetEmojisQuery = {
  serverId: string;
  getCreators?: boolean;
};

export type CreateEmojiFields = {
  name: string;
  serverId: string;
  file: File;
};

export type EditEmojiFields = {
  emojiId: string;
  name: string;
  serverId: string;
};