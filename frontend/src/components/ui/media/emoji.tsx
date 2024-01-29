import { Twemoji } from './twemoji';

import styles from './emoji.module.scss';

export type EmojiProps = {
  name?: string;
  custom: boolean;
  emoji: string;
  className?: string;
};

export function Emoji({
  name,
  custom,
  emoji,
  className,
}: EmojiProps) {
  const emojiProps = {
    className: `${styles.customEmoji} ${className || ''}`,
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