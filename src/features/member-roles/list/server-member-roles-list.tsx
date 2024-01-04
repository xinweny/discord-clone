import { useParams } from 'react-router-dom';
import pluralize from 'pluralize';

import { ServerMemberRoleCard } from './server-member-role-card';
import { AddRolesButton } from '../add';

import { useGetMemberRolesQuery } from '../api';

import PlusIcon from '@assets/icons/plus.svg?react';

import styles from './server-member-roles-list.module.scss';

type ServerMemberRolesListProps = {
  memberId: string;
};

export function ServerMemberRolesList({ memberId }: ServerMemberRolesListProps) {
  const { serverId } = useParams();

  const { data: roles, isSuccess } = useGetMemberRolesQuery({
    serverId: serverId!,
    memberId,
  });

  if (!isSuccess) return null;

  const customRoles = roles.slice(1);

  return (
    <div className={styles.list}>
      <h3>{
        customRoles.length > 0
          ? pluralize('ROLE', customRoles.length)
          : 'NO ROLES'
      }</h3>
      <div>
        {customRoles.map(role => (
          <ServerMemberRoleCard
            key={role._id}
            memberRole={role}
            serverId={serverId!}
            memberId={memberId}
          />
        ))}
        <AddRolesButton>
          <div className={styles.addButton}>
            <PlusIcon />
          </div>
        </AddRolesButton>
      </div>
    </div>
  );
}