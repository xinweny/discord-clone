import { useParams } from 'react-router-dom';

import type { ChannelData } from '@features/channels/types';

import { ConnectToRoomButton } from '../connect';
import { ChannelOngoingCallParticipantCard } from './channel-ongoing-participant-card';

import { OngoingCallWrapper } from '../get';

import { useGetParticipantsQuery } from '../api';

import styles from './channel-ongoing-call.module.scss';

type ChannelOngoingCallProps = {
  header: React.ReactNode;
  channel: ChannelData;
};

export function ChannelOngoingCall({
  header,
  channel,
}: ChannelOngoingCallProps) {
  const { _id, name } = channel;

  const { serverId } = useParams();

  const { data: participants, isSuccess } = useGetParticipantsQuery(_id);

  if (!isSuccess || participants.length === 0) return null;

  const placeholder = (
    <div className={styles.placeholder}>
      <h3>{name}</h3>
      <p>No one is currently in voice.</p>
      <ConnectToRoomButton
        roomId={_id}
        roomName={name}
        serverId={serverId!}
      >
        Join Voice
      </ConnectToRoomButton>
    </div>
  );

  return (
    <OngoingCallWrapper
      header={header}
      placeholder={placeholder}
    >
      <div>
        {participants.map(participant =>
          <ChannelOngoingCallParticipantCard
            key={participant.identity}
            participant={participant}
            serverId={serverId!}
          />
        )}
      </div>
    </OngoingCallWrapper>
  );
}