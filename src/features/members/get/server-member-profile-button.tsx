import type { PositionData } from '@components/hooks';

import { Popout } from '@components/ui/popups';

import { ServerMemberProfileCard } from '.';

import { useLazyGetServerMemberQuery } from '../api';

type ServerMemberProfileButtonProps = {
  children: React.ReactNode;
  position: PositionData;
  memberId: string;
  serverId: string;
};

export function ServerMemberProfileButton({
  children,
  position,
  memberId,
  serverId,
}: ServerMemberProfileButtonProps) {
  const [getServerMember] = useLazyGetServerMemberQuery();

  const renderPopup = async () => {
    const serverMember = await getServerMember({
      serverId,
      memberId,
    }).unwrap();

    if (!serverMember) return null;

    return <ServerMemberProfileCard
      member={serverMember}
    />;
  };

  return (
    <Popout
      renderPopup={renderPopup}
      position={position}
    >
      {children}
    </Popout>
  );
}