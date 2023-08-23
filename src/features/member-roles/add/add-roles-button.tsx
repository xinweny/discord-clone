import { ClickPopup } from '@components/ui/popups';
import { AddRolePopup } from './add-role-popup';

export function AddRolesButton() {
  return (
    <ClickPopup
      renderPopup={() => <AddRolePopup />}
    >
      <div>+</div>
    </ClickPopup>
  );
}