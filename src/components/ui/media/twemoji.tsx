import { getTwemoji } from '@utils';

type TwemojiProps = {
  emoji: string;
} & React.HTMLProps<HTMLImageElement>;

export function Twemoji({ emoji, ...props }: TwemojiProps) {
  const { hexCodePoint, url } = getTwemoji(emoji);

  if (!hexCodePoint) return <img src="#" alt="Error" />

  return (
    <img
      src={url}
      {...props}
    />
  );
}