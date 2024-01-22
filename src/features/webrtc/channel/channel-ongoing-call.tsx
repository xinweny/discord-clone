import { useParams } from 'react-router-dom';

import { ChannelTypes, type ChannelData } from '@features/channels/types';

import { ChannelOngoingCallParticipantCard } from './channel-ongoing-participant-card';
import { ConnectToRoomButton } from '../connect';
import { OngoingCallWrapper } from '../get';

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
        <div>
          {hasOngoingCall && (participants.map(participant =>
            <ChannelOngoingCallParticipantCard
              key={participant.identity}
              participant={participant}
              serverId={serverId!}
            />
          ))}
        </div>
        <div>
          <h3>{name}</h3>
            <span>No one is currently in voice.</span>
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