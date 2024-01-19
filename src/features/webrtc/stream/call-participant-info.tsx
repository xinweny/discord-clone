import type { Participant } from 'livekit-client';

import MutedIcon from '@assets/icons/microphone-mute.svg?react';

import styles from './call-participant-info.module.scss';

type CallParticipantInfoProps = {
  participant: Participant;
  className?: string;
  label?: string;
  showLabel?: boolean;
  withSs?: boolean;
};

export function CallParticipantInfo({
  participant,
  className,
  label,
  showLabel = true,
  withSs = false,
}: CallParticipantInfoProps) {
  const {
    isMicrophoneEnabled,
  } = participant;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.label} hidden={!showLabel}>
        {withSs && <img src="#" alt="Icon" />}
        <span>{label}</span>
      </div>
      <div className={styles.statuses}>
        {!isMicrophoneEnabled && (
          <div className={styles.button}>
            <MutedIcon />
          </div>
        )}
      </div>
    </div>
  );
}