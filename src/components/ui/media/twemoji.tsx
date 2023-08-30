import twemoji from 'twemoji';

type TwemojiProps = {
  emoji: string;
} & React.HTMLProps<HTMLImageElement>;

export function Twemoji({ emoji, ...props }: TwemojiProps) {
  const hexCodePoint = twemoji.convert.toCodePoint(emoji);

  if (!hexCodePoint) return <img src="#" alt="Error" />

  return (
    <img
      src={`https://twemoji.maxcdn.com/v/14.0.2/svg/${hexCodePoint}.svg`}
      {...props}
    />
  );
}