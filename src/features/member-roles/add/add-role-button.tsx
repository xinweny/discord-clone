import { MemberRoleData } from '../types';

import { useAddMemberRoleMutation } from '../api';

type AddRoleButtonProps = {
  serverId: string;
  memberId: string;
  memberRole: MemberRoleData;
};

export function AddRoleButton({
  serverId,
  memberId,
  memberRole,
}: AddRoleButtonProps) {
  const { _id, color, name } = memberRole;

  const [addRole] = useAddMemberRoleMutation();

  const handleClick = async () => {
    await addRole({
      serverId,
      memberId,
      roleId: _id,
    }).unwrap();
  };

  return (
    <button onClick={handleClick}>
      <div>
        <div
          style={{ backgroundColor: color }}
        ></div>
        <p>{name}</p>
      </div>
    </button>
  );
}