export type EmojiData = {
  _id: string;
  creatorId: string;
  name: string;
  url: string;
};

export type CreateEmojiFields = {
  name: string;
  serverId: string;
  file: File;
};