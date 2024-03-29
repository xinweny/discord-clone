import { useModal } from '@components/hooks';

import { LogoutConfirmModal } from './logout-confirm-modal';

export function LogoutButton() {
  const [show, toggle] = useModal();

  return (
    <>
      <button type="button" onClick={toggle}>
        Log Out
      </button>
      <LogoutConfirmModal isOpen={show} onClose={toggle} />
    </>
  );
}