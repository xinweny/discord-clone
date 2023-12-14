import { useActiveRoleContext } from '../context';
import { useServerContext } from '@features/servers/context';

import { useCreateRoleMutation } from '../api';

type CreateRoleButtonProps = {
  children: React.ReactNode;
};

export function CreateRoleButton({ children }: CreateRoleButtonProps) {
  const activeRole = useActiveRoleContext();
  const { _id: serverId } = useServerContext()!;

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