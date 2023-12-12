import HashIcon from '@assets/icons/hash.svg?react';
import SpeakerIcon from '@assets/icons/speaker.svg?react';

import styles from './channel-icon.module.scss';

type ChannelIconProps = {
  type: 'text' | 'voice';
};

export function ChannelIcon({ type }: ChannelIconProps) {
  if (type === 'text') return <HashIcon className={styles.icon} />;

  if (type === 'voice') return <SpeakerIcon className={styles.icon} />;
}