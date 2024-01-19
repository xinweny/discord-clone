import type { Participant } from 'livekit-client';
import { VideoTrack, AudioTrack } from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

import { CallParticipantInfo } from './call-participant-info';

import { useGetUserQuery } from '@features/users/api';

import styles from './private-participant-tile.module.scss';

type PrivateParticipantTileProps = {
  localParticipant?: Participant;
  remoteParticipant?: Participant;
  showDetails?: boolean;
};

export function PrivateParticipantTile({
  localParticipant,
  remoteParticipant,
  showDetails = true,
}: PrivateParticipantTileProps) {
  const { data: localUser } = useGetUserQuery(localParticipant?.identity || '', {
    skip: !localParticipant?.identity,
  });
  const { data: remoteUser } = useGetUserQuery(remoteParticipant?.identity || '', { skip: !remoteParticipant?.identity });

  const localTracks = getParticipantTracks(localParticipant);
  const remoteTracks = getParticipantTracks(remoteParticipant);

  const mainParticipant = remoteParticipant?.isCameraEnabled || remoteParticipant?.isScreenShareEnabled
    ? remoteParticipant
    : localParticipant;

  const mainTracks = getParticipantTracks(mainParticipant);

  return (
    <>
      <div className={styles.mainTile}>
        <VideoTrack
          className={styles.videoTrack}
          trackRef={mainTracks?.ssTrack || mainTracks?.cameraTrack}
          participant={mainParticipant}
        />
        <CallParticipantInfo
          participant={mainParticipant!}
          label={mainParticipant?.identity === remoteUser?._id
            ? remoteUser?.displayName
            : localUser?.displayName}
          showLabel={showDetails}
        />
      </div>
      {localParticipant?.isMicrophoneEnabled && localTracks?.audioTrack && (
        <AudioTrack trackRef={localTracks?.audioTrack} participant={localParticipant} />
      )}
      {remoteParticipant?.isMicrophoneEnabled && remoteTracks?.audioTrack && (
        <AudioTrack trackRef={remoteTracks?.audioTrack} participant={remoteParticipant} />
      )}
    </>
  );
}