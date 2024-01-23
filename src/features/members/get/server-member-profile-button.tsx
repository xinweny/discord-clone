import { useState } from 'react';

import type { PositionData } from '@components/hooks';

import { Popout } from '@components/ui/popups';

import { ServerMemberProfileCard } from '.';

import { useLazyGetServerMemberQuery } from '../api';

type ServerMemberProfileButtonProps = {
  children: React.ReactNode;
  position: PositionData;
  memberId: string;
  serverId: string;
  className?: string;
  activeClass?: string;
};

export function ServerMemberProfileButton({
  children,
  position,
  memberId,
  serverId,
  className,
  activeClass,
}: ServerMemberProfileButtonProps) {
  const [getServerMember] = useLazyGetServerMemberQuery();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderPopup = async () => {
    const serverMember = await getServerMember({
      serverId,
      memberId,
    }).unwrap();

    if (!serverMember) return null;

    return <ServerMemberProfileCard member={serverMember} />;
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