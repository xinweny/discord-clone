import { useParams } from 'react-router-dom';
import pluralize from 'pluralize';

import { ChannelTypes, type ChannelData } from '@features/channels/types';

import { ConnectToRoomButton } from '../connect';
import { OngoingCallParticipantLoop, OngoingCallWrapper } from '../get';

import { useGetParticipantsQuery } from '../api';

import styles from './channel-ongoing-call.module.scss';

type ChannelOngoingCallProps = {
  header: React.ReactNode;
  channel: ChannelData;
};

export function ChannelOngoingCall({ header, channel }: ChannelOngoingCallProps) {
  const { _id: roomId, name } = channel;

  const { serverId } = useParams();

  const { data: participants } = useGetParticipantsQuery(roomId);

  const hasOngoingCall = participants && participants.length > 0;

  return (
    <OngoingCallWrapper
      header={header}
      alwaysShow={channel.type === ChannelTypes.VOICE}
      className={styles.container}
    >
      <div>
        <OngoingCallParticipantLoop
          participants={participants}
          className={styles.tiles}
        />
        <div className={styles.noCall}>
          <h2>{name}</h2>
            <span>{`${hasOngoingCall ? pluralize('Member', participants.length, true) : 'No one is'} currently in voice.`}</span>
            <ConnectToRoomButton
              roomId={roomId}
              roomName={name}
              serverId={serverId!}
            >
              Join Voice
            </ConnectToRoomButton>
          </div>
      </div>
    </OngoingCallWrapper>
  );
}