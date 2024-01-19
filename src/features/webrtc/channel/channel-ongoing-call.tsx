import { useParams } from 'react-router-dom';

import type { ChannelData } from '@features/channels/types';

import { ConnectToRoomButton } from '../connect';
import { ChannelOngoingCallParticipantCard } from './channel-ongoing-participant-card';

import { useGetParticipantsQuery } from '../api';

type ChannelOngoingCallProps = {
  channel: ChannelData;
};

export function ChannelOngoingCall({ channel }: ChannelOngoingCallProps) {
  const { _id, name } = channel;

  const { serverId } = useParams();

  const { data: participants } = useGetParticipantsQuery(_id);

  return !participants || participants.length === 0
    ? (
      <div>
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
    )
    : (
      <div>{participants.map(participant =>
        <ChannelOngoingCallParticipantCard
          key={participant.identity}
          participant={participant}
          serverId={serverId!}
        />
      )}</div>
    );
}