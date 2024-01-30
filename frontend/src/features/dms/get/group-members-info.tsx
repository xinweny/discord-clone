import type { UserBasicData } from '@features/users/types';

import styles from './group-members-info.module.scss';
import { GroupMemberCard } from './group-member-card';

type GroupMembersInfoProps = {
  participants: UserBasicData[];
};

export function GroupMembersInfo({
  participants
}: GroupMembersInfoProps) {
  return (
    <>
      <h3 className={styles.groupHeader}>{`MEMBERS - ${participants.length}`}</h3>
      <div>
        {participants.map(participant => (
          <GroupMemberCard user={participant} />
        ))}
      </div>
    </>
  );
}