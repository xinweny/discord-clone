import HashIcon from '@assets/icons/hash.svg?react';
import SpeakerIcon from '@assets/icons/speaker.svg?react';

type ChannelIconProps = {
  type: 'text' | 'voice';
};

export function ChannelIcon({ type }: ChannelIconProps) {
  if (type === 'text') return <HashIcon />;

  if (type === 'voice') return <SpeakerIcon />;
}