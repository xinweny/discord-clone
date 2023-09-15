import { Twemoji } from './twemoji';

export type EmojiProps = {
  name?: string;
  custom: boolean;
  emoji: string;
} & React.HTMLProps<HTMLImageElement>;

export function Emoji({
  name,
  custom,
  emoji,
  ...props
}: EmojiProps) {
  const { className } = props;

  const emojiProps = {
    className: `emoji ${className || ''}`,
    style: {
      width: custom ? 'auto' : '32px',
      height: custom ? 'auto' : '32px',
      maxWidth: '32px',
      maxHeight: '32px',
    },
  };

  if (!custom) return <Twemoji emoji={emoji} {...emojiProps} />;

  return (
    <img
      {...emojiProps}
      src={emoji}
      alt={name}
    />
  );
}