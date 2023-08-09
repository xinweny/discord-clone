import { useModal } from '@hooks';

import { LogoutConfirmModal } from './logout-confirm-modal';

export function LogoutButton() {
  const [show, toggle] = useModal();

  return (
    <div>
      <button type="button" onClick={toggle}>
        Log Out
      </button>
      <LogoutConfirmModal isOpen={show} onClose={toggle} />
    </div>
  );
}