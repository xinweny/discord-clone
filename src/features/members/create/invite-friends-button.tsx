import { ModalButton, ModalButtonProps } from '@components/ui/buttons';
import { InviteFriendsModal } from './invite-friends-modal';

export function InviteFriendsButton({
  children,
  btnRef,
  ...props
}: ModalButtonProps) {
  return (
    <ModalButton
      modal={InviteFriendsModal}
      btnRef={btnRef}
      {...props}
    >
      {children}
    </ModalButton>
  );
}