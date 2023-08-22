import { useContext } from 'react';

import { ActiveRoleContext } from '../context';
import { ServerContext } from '@features/server/context';

import { useCreateRoleMutation } from '../api';

type CreateRoleButtonProps = {
  children: React.ReactNode;
};

export function CreateRoleButton({ children }: CreateRoleButtonProps) {
  const activeRole = useContext(ActiveRoleContext);
  const { _id: serverId } = useContext(ServerContext)!;

  const [createRole] = useCreateRoleMutation();

  const handleClick = async () => {
    const role = await createRole(serverId).unwrap();

    activeRole?.set(role);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >{children}</button>
  );
}