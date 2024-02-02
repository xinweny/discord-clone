import { Participant } from 'livekit-client';
import { VideoTrack } from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

import { Avatar } from '@components/ui/media';

import { useTileBgColor } from '../hooks';

import { useGetUserServerMemberQuery } from '@features/members/api';
import { useGetUserQuery } from '@features/users/api';

import { CallParticipantInfo } from './call-participant-info';

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
    isScreenShareEnabled,
    isCameraEnabled,
    isSpeaking,
  } = participant;

  const {
    cameraTrack,
    ssTrack,
  } = getParticipantTracks(participant)!;

  const { data: member } = useGetUserServerMemberQuery({
    userId,
    serverId: serverId!,
  }, { skip: !serverId || !userId });
  const { data: user } = useGetUserQuery(userId, { skip: !!serverId || !userId });

  const displayName = member?.displayName || user?.displayName;
  const avatarUrl = member?.user.avatarUrl || user?.avatarUrl;

  const color = useTileBgColor(avatarUrl);

  return (
    <>
      {isScreenShareEnabled && ssTrack && (
        <div className={styles.track}>
          <VideoTrack
            className={styles.videoTrack}
            // @ts-ignore
            trackRef={ssTrack}
            participant={participant}
          />
          <CallParticipantInfo
            className={styles.info}
            participant={participant}
            label={displayName}
            showLabel={showDetails}
            withSs
          />
        </div>
      )}
      <div
        className={`${styles.track} ${isSpeaking ? styles.speaking : ''}`}
        style={{ backgroundColor: color }}
      >
        {isCameraEnabled && cameraTrack
          ? <VideoTrack
            className={styles.videoTrack}
            // @ts-ignore
            trackRef={cameraTrack}
            participant={participant}
          />
          : <Avatar src={avatarUrl} className={styles.avatar} />
        }
        <CallParticipantInfo
          className={styles.info}
          participant={participant}
          label={displayName}
          showLabel={showDetails}
        />
      </div>
    </>
  );
}