import { useState } from 'react';

import type { PositionData } from '@components/hooks';
import type { UserData } from '../types';

import { Popout } from '@components/ui/popups';

import { ServerMemberRolesList } from '@features/member-roles/list';

import { UserProfileSummaryCard } from './user-profile-summary-card';

import { useLazyGetServerMemberQuery } from '@features/members/api';
import { useLazyGetUserQuery } from '../api';

type UserProfileSummaryButtonProps = {
  children: React.ReactNode;
  position?: PositionData;
  userId: string;
  serverId?: string;
  className?: string;
  activeClass?: string;
};

export function UserProfileSummaryButton({
  children,
  position = {
    direction: 'left',
    align: 'start',
    gap: 16,
  },
  userId,
  serverId,
  activeClass,
  className,
}: UserProfileSummaryButtonProps) {
  const [getServerMember] = useLazyGetServerMemberQuery();
  const [getUser] = useLazyGetUserQuery();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderPopup = async () => {
    if (serverId) {
      const member = await getServerMember({
        serverId,
        memberId: userId,
      }).unwrap();

      if (!member) return null;

      return (
        <UserProfileSummaryCard
          member={member}
          user={member.user as UserData}
        >
          <ServerMemberRolesList memberId={member._id} />
        </UserProfileSummaryCard>
      );
    } else {
      const user = await getUser(userId).unwrap();

      if (!user) return null;

      return <UserProfileSummaryCard user={user} />;
    }
  };

  return (
    <Popout
      renderPopup={renderPopup}
      position={position}
      className={`${className || ''} ${isOpen && activeClass ? activeClass : ''}`}
      onOpen={() => { setIsOpen(true); }}
      onClose={() => { setIsOpen(false); }}
    >
      {children}
    </Popout>
  );
}