import { useActiveRoleContext } from '../context';
import { useServerContext } from '@features/servers/context';

import { useCreateRoleMutation } from '../api';

type CreateRoleButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function CreateRoleButton({ children, className }: CreateRoleButtonProps) {
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
      className={className}
    >{children}</button>
  );
}