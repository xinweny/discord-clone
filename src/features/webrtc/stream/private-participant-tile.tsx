import type { Participant } from 'livekit-client';
import { VideoTrack } from '@livekit/components-react';

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

  const mainParticipant = remoteParticipant?.isCameraEnabled || remoteParticipant?.isScreenShareEnabled
    ? remoteParticipant
    : localParticipant;

  const mainTracks = getParticipantTracks(mainParticipant);

  const isRemoteMain = mainParticipant && mainParticipant.identity === remoteUser?._id;

  const participants = [remoteParticipant, localParticipant];

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
          label={isRemoteMain
            ? remoteUser?.displayName
            : localUser?.displayName}
          showLabel={showDetails}
        />
      </div>
      <div className={styles.popoutTracks}>
        {participants.map((participant, i) => {
          if (!participant) return null;

          const { cameraTrack } = getParticipantTracks(participant)!;

          if (i === 0
            ? !(participant.isScreenShareEnabled && participant.isCameraEnabled)
            : isRemoteMain || !participant.isScreenShareEnabled || !participant.isCameraEnabled
          )
           return null;

          if (!cameraTrack) return null
          
          return (
            <div
              className={`${styles.popoutTrack} ${participant.isSpeaking ? styles.speaking : ''}`}
              key={participant.identity}
            >
              <VideoTrack
                className={styles.videoTrack}
                trackRef={cameraTrack}
                participant={participant}
              />
              <CallParticipantInfo
                className={styles.info}
                participant={participant}
                label={i === 0
                  ? remoteUser?.displayName
                  : localUser?.displayName}
                showLabel={showDetails}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}