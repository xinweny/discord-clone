import { Participant } from 'livekit-client';
import { AudioTrack, VideoTrack } from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

import { Avatar } from '@components/ui/media';

import { useGetUserServerMemberQuery } from '@features/members/api';
import { useGetUserQuery } from '@features/users/api';

import MutedIcon from '@assets/icons/microphone-mute.svg?react';

import styles from './group-participant-tile.module.scss';

type GroupParticipantTileProps = {
  participant: Participant;
  showDetails?: boolean;
  serverId?: string;
};

export function GroupParticipantTile({
  participant,
  showDetails = true,
  serverId,
}: GroupParticipantTileProps) {
  const {
    identity: userId,
    isMicrophoneEnabled,
    isScreenShareEnabled,
    isCameraEnabled,
    isSpeaking,
  } = participant;

  const {
    cameraTrack,
    ssTrack,
    audioTrack,
    ssAudioTrack,
  } = getParticipantTracks(participant);

  const { data: member } = useGetUserServerMemberQuery({
    userId,
    serverId: serverId!,
  }, { skip: !serverId || !userId });
  const { data: user } = useGetUserQuery(userId, { skip: !!serverId || !userId });

  const displayName = member?.displayName || user?.displayName;
  const avatarUrl = member?.user.avatarUrl || user?.avatarUrl;

  return (
    <div className={styles.tile}>
      {isScreenShareEnabled && ssTrack && (
        <div className={styles.track}>
          <VideoTrack trackRef={ssTrack} participant={participant} />
          {ssAudioTrack && (
            <AudioTrack trackRef={ssAudioTrack} participant={participant} />
          )}
          <div className={styles.info} hidden={!showDetails}>
            <img src="#" alt="Icon" />
            <span>{displayName}</span>
          </div>
        </div>
      )}
      <div className={`${styles.track} ${isSpeaking ? styles.speaking : ''}`}>
        {isCameraEnabled && cameraTrack
          ? <VideoTrack trackRef={cameraTrack} participant={participant} />
          : <Avatar src={avatarUrl} />
        }
        <div className={styles.info} hidden={!showDetails}>
          <span>{displayName}</span>
        </div>
        <div className={styles.statuses}>
          {!isMicrophoneEnabled && (
            <div className={styles.button}>
              <MutedIcon />
            </div>
          )}
        </div>
      </div>
      {isMicrophoneEnabled && audioTrack && (
        <AudioTrack trackRef={audioTrack} participant={participant} />
      )}
    </div>
  );
}