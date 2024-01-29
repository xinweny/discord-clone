import { useRemoveMemberRoleMutation } from '../api';

import { useServerAuthorize } from '@features/servers/hooks';

import CrossIcon from '@assets/icons/cross.svg?react';

type RemoveMemberRoleButtonProps = {
  serverId: string;
  memberId: string;
  roleId: string;
  className?: string;
};

export function RemoveMemberRoleButton({  
  serverId,
  memberId,
  roleId,
  className,
}: RemoveMemberRoleButtonProps) {
  const [removeRole] = useRemoveMemberRoleMutation();

  const authorize = useServerAuthorize('manageRoles');

  const handleClick = async () => {
    await removeRole({
      serverId,
      memberId,
      roleId,
    }).unwrap();
  };

  if (!authorize) return null;

  return (
    <button onClick={handleClick} className={className}>
      <CrossIcon strokeWidth={1} />
    </button>
  );
}