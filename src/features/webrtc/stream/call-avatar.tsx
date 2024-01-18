import { Participant } from 'livekit-client';
import { AudioTrack } from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

import { Avatar } from '@components/ui/media';

import { useGetUserQuery } from '@features/users/api';

import MutedIcon from '@assets/icons/microphone-mute.svg?react';

import styles from './call-avatar.module.scss';

type CallAvatarProps = {
  participant: Participant;
};

export function CallAvatar({ participant }: CallAvatarProps) {
  const {
    identity: userId,
    isMicrophoneEnabled,
    isSpeaking,
  } = participant;

  const { audioTrack } = getParticipantTracks(participant);

  const { data: user } = useGetUserQuery(userId, { skip: !userId });

  return (
    <div className={`${styles.wrapper} ${isSpeaking ? styles.speaking : ''}`}>
      <Avatar
        className={styles.avatar}
        src={user?.avatarUrl}
      />
      {!isMicrophoneEnabled && (
        <div className={styles.notification}>
          <MutedIcon />
        </div>
      )}
      {isMicrophoneEnabled && audioTrack && (
        <AudioTrack trackRef={audioTrack} participant={participant} />
      )}
    </div>
  );
}