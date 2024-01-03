import { UserProfileModal } from './user-profile-modal';

import { ModalButton } from '@components/ui/buttons';

type UserProfileButtonProps = {
  userId: string;
  children: React.ReactNode;
  onOpen?: () => void;
};

export function UserProfileButton({ userId, children, onOpen }: UserProfileButtonProps) {
  return (
    <ModalButton
      modal={UserProfileModal}
      modalProps={{ userId }}
      onOpen={onOpen}
    >
      {children}
    </ModalButton>
  );
}