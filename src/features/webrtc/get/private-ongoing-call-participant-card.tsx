import type { Participant } from 'livekit-client';

import { Avatar } from '@components/ui/media';

import { useGetUserQuery } from '@features/users/api';

import styles from './private-ongoing-call-participant-card.module.scss';

type PrivateOngoingCallParticipantCardProps = {
  participant: Participant;
};

export function PrivateOngoingCallParticipantCard({ participant }: PrivateOngoingCallParticipantCardProps) {
  const userId = participant.identity;

  const { data: user } = useGetUserQuery(userId);

  const avatarUrl = user?.avatarUrl;

  return (
    <div className={styles.card}>
      <Avatar src={avatarUrl} />
    </div>
  );
}