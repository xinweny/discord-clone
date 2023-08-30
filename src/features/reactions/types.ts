export enum ReactionTypes {
  CUSTOM_EMOJI = 'custom',
  EMOJI = 'emoji',
}

type CustomEmojiReactionData = {
  __t: ReactionTypes.CUSTOM_EMOJI;
  emojiId: string;
  url: string;
};

type EmojiReactionData = {
  __t: ReactionTypes.EMOJI;
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
  emoji: { name: string } & ({
    custom: false;
    unified: string;
    native: string;
  } | {
    custom: true;
    emojiId: string;
    url: string;
  });
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