import { useRemoveMemberRoleMutation } from '../api';

import { useServerAuthorize } from '@features/servers/hooks';

type RemoveMemberRoleButtonProps = {
  serverId: string;
  memberId: string;
  roleId: string;
};

export function RemoveMemberRoleButton({  
  serverId, memberId, roleId
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
    <button onClick={handleClick}>x</button>
  );
}