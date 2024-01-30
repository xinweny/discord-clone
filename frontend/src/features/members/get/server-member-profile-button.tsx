import type { PositionData } from '@components/hooks';

import { UserProfileSummaryButton } from '@features/users/get';

type ServerMemberProfileButtonProps = {
  children: React.ReactNode;
  position?: PositionData;
  memberId: string;
  serverId: string;
  activeClass?: string;
  className?: string;
};

export function ServerMemberProfileButton({
  children,
  position,
  memberId,
  serverId,
  className,
  activeClass,
}: ServerMemberProfileButtonProps) {
  return (
    <UserProfileSummaryButton
      position={position}
      userId={memberId}
      serverId={serverId}
      className={className}
      activeClass={activeClass}
    >
      {children}
    </UserProfileSummaryButton>
  );
}