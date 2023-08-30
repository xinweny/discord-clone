type CustomEmojiReactionData = {
  type: 'custom';
  emojiId: string;
  url: string;
};

type EmojiReactionData = {
  type: 'emoji';
  unified: string;
  native: string;
};

export type ReactionData = {
  _id: string;
  messageId: string;
  name: string;
  userHasReacted: boolean;
  count: number;
} & (CustomEmojiReactionData | EmojiReactionData);

export type GetReactionCountsQuery = {
  serverId?: string;
  roomId: string;
  messageId: string;
};

export type CreateReactionsFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
  emoji:  CustomEmojiReactionData | EmojiReactionData;
};

export type IncrementReactionFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
  reactionId: string;
};

export type DecrementReactionFields = {
  serverId?: string;
  roomId: string;
  messageId: string;
  reactionId: string;
};