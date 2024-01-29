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

export type DeleteEmojiFields = {
  emojiId: string;
  serverId: string;
};

type PickerCustomEmojiData = {
  id: string;
  name: string;
  skins: { src: string }[];
};

export type PickerCategoryData = {
  [key: string]: { src: string };
};

export type PickerServerEmojisData = {
  id: string;
  name: string;
  emojis: PickerCustomEmojiData[];
};