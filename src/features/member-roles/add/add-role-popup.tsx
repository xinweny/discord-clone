import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useServerMemberContext } from '@features/members/context';

import { useServerAuthorize } from '@features/servers/hooks';

import { RoleSearchBar } from '@features/roles/list';
import { AddRoleButton } from './add-role-button';

import { useGetRolesQuery } from '@features/roles/api';

import styles from './add-role-popup.module.scss';

type AddRolePopupProps = {
  btnRef?: React.RefObject<HTMLButtonElement>;
};

export function AddRolePopup({
  btnRef
}: AddRolePopupProps) {
  const { serverId } = useParams();

  const member = useServerMemberContext();

  const [query, setQuery] = useState<string>('');

  const { data: roles, isSuccess } = useGetRolesQuery({ serverId: serverId! });

  const authorized = useServerAuthorize('manageRoles');

  if (!isSuccess || !member) return null;

  const customRoles = roles.filter(
    role => !member.roleIds.includes(role._id)
  );
  
  const filteredRoles = query
    ? customRoles.filter(
      role => role.name.toLowerCase().includes(query.toLowerCase())
    )
    : customRoles;

  if (!authorized) return null;

  return (
    <div className={styles.container}>
      <RoleSearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Role"
      />
        {filteredRoles.length > 0
          ? (
            <ul className={styles.list}>
              {filteredRoles.map(role => (
                <AddRoleButton
                  key={role._id}
                  memberId={member._id}
                  serverId={serverId!}
                  memberRole={role}
                  btnRef={btnRef}
                />
              ))}
            </ul>
          )
          : (
            <div className={styles.noResult}>
              <h2>Nope!</h2>
              <span>Did you make a typo?</span>
            </div>
          )
        }
    </div>
  );
}