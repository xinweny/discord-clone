import MutedIcon from '@assets/icons/microphone-mute.svg?react';

import styles from './track-container.module.scss';

type TrackContainerProps = {
  label: string;
  isMicrophoneEnabled: boolean;
  children: React.ReactNode;
  className?: string;
  showDetails?: boolean;
}

export function TrackContainer({
  label,
  isMicrophoneEnabled,
  children,
  className,
  showDetails = true,
}: TrackContainerProps) {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      {children}
      <span hidden={!showDetails}>{label}</span>
      {!isMicrophoneEnabled && (
        <div className={styles.muted} hidden={!showDetails}>
          <MutedIcon />
        </div>
      )}
    </div>
  );
}