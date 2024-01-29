import { UserProfileModal } from './user-profile-modal';

import { ModalButton } from '@components/ui/buttons';

type UserProfileButtonProps = {
  userId: string;
  children: React.ReactNode;
  className?: string,
  onOpen?: () => void;
};

export function UserProfileButton({ userId, children, onOpen, className }: UserProfileButtonProps) {
  return (
    <ModalButton
      modal={UserProfileModal}
      modalProps={{ userId }}
      onOpen={onOpen}
      className={className}
    >
      {children}
    </ModalButton>
  );
}