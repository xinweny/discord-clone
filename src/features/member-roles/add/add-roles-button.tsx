import { ClickPopup } from '@components/ui/popups';
import { AddRolePopup } from './add-role-popup';

type AddRolesButtonProps = {
  children: React.ReactNode;
};

export function AddRolesButton({
  children,
}: AddRolesButtonProps) {
  return (
    <ClickPopup
      renderPopup={() => <AddRolePopup />}
      position={{
        direction: 'bottom',
        align: 'center',
        gap: 4,
      }}
    >
      {children}
    </ClickPopup>
  );
}