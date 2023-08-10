type ChannelIconProps = {
  type: 'text' | 'voice';
};

export function ChannelIcon({ type }: ChannelIconProps) {
  if (type === 'text') return <img src="" alt="Text" />;

  if (type === 'voice') return <img src="" alt="voice" />;
}