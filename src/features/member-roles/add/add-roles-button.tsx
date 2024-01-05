import { Popout } from '@components/ui/popups';
import { AddRolePopup } from './add-role-popup';

type AddRolesButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function AddRolesButton({
  children,
  className,
}: AddRolesButtonProps) {
  return (
    <Popout
      renderPopup={() => <AddRolePopup />}
      position={{
        direction: 'bottom',
        align: 'center',
        gap: 8,
      }}
      className={className}
    >
      {children}
    </Popout>
  );
}