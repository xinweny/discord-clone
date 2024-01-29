import { useGetParticipantsQuery } from '../api';
import { ChannelOngoingCallParticipantCardPreview } from './channel-ongoing-call-participant-card-preview';

import styles from './channel-ongoing-call-preview.module.scss';

type ChannelOngoingCallPreviewProps = {
  roomId: string;
  serverId: string;
};

export function ChannelOngoingCallPreview({
  roomId,
  serverId,
}: ChannelOngoingCallPreviewProps) {
  const { data: participants, isSuccess } = useGetParticipantsQuery(roomId);

  if (!isSuccess || participants.length === 0) return null;

  return (
    <div className={styles.preview}>
      {participants.map(participant =>
        <ChannelOngoingCallParticipantCardPreview
          key={participant.identity}
          participant={participant}
          serverId={serverId}
        />
      )}
    </div>
  );
}
