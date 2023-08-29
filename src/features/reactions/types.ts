import { CustomEmojiData } from '@features/emojis/types';

export type ReactionData = {
  _id: string;
  reactorId: string;
  messageId: string;
} & ({
  custom: true;
  emojiId: string;
} | {
  custom: false;
  emoji: string;
});

export type ReactionCountData = {
  _id: string;
  count: number;
  data: ReactionData;
  customEmoji?: CustomEmojiData;
};

export type GetReactionCountsQuery = {
  serverId?: string;
  roomId: string;
  messageId: string;
};