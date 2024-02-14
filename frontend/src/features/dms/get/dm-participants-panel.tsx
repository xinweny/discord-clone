import type { UserBasicData } from '@features/users/types';

import { useGetUserQuery } from '@features/users/api';

import { UserShortProfile } from '@features/users/get';
import { MutualsLists } from '@features/mutuals/list';

import styles from './dm-participants-panel.module.scss';
import { GroupMembersInfo } from './group-members-info';

type DmParticipantsPanelProps = {
  participants: UserBasicData[];
  isGroup: boolean;
  show: boolean;
};

export function DmParticipantsPanel({ participants, isGroup, show }: DmParticipantsPanelProps) {
  const { data: participant, isSuccess } = useGetUserQuery(participants[1]._id, { skip: isGroup });
  
  if (!show) return null;

  return (
    <div className={`${styles.container} ${isGroup ? styles.narrow : ''}`}>
      {(!isGroup && isSuccess)
        ? <>
          <UserShortProfile user={participant} />
          <MutualsLists participantId={participant._id} />
        </>
        : <GroupMembersInfo participants={participants} />
      }
    </div>
  )
}