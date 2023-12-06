import { Twemoji } from './twemoji';

import styles from './emoji.module.scss';

export type EmojiProps = {
  name?: string;
  custom: boolean;
  emoji: string;
};

export function Emoji({
  name,
  custom,
  emoji,
}: EmojiProps) {
  const emojiProps = {
    className: styles.customEmoji,
  };

  if (!custom) return <Twemoji emoji={emoji} {...emojiProps} />;

  return (
    <img
      src={emoji}
      alt={name}
      {...emojiProps}
    />
  );
}