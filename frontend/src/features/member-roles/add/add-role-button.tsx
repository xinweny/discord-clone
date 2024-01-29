import type { MemberRoleData } from '../types';

import { useServerAuthorize } from '@features/servers/hooks';

import { useAddMemberRoleMutation } from '../api';

import styles from './add-role-button.module.scss';

type AddRoleButtonProps = {
  serverId: string;
  memberId: string;
  memberRole: MemberRoleData;
  btnRef?: React.RefObject<HTMLButtonElement>;
};

export function AddRoleButton({
  serverId,
  memberId,
  memberRole,
  btnRef,
}: AddRoleButtonProps) {
  const { _id, color, name } = memberRole;

  const [addRole] = useAddMemberRoleMutation();

  const authorized = useServerAuthorize('manageRoles');

  const handleClick = async () => {
    await addRole({
      serverId,
      memberId,
      roleId: _id,
    }).unwrap();

    btnRef?.current?.click();
  };

  if (!authorized) return null;

  return (
    <li className={styles.listItem}>
      <button onClick={handleClick} className={styles.button}>
        <div style={{ backgroundColor: color }}></div>
        <span>{name}</span>
      </button>
    </li>
  );
}