import { useServerAuthorize } from '@features/servers/hooks';

import { ModalButton } from '@components/ui/buttons';
import { DeleteServerModal } from './delete-server-modal';

type DeleteServerButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function DeleteServerButton({ children, className }: DeleteServerButtonProps) {
  const authorized = useServerAuthorize('administrator');

  if (!authorized) return null;

  return (
    <ModalButton
      modal={DeleteServerModal}
      className={className}
    >
      {children}
    </ModalButton>
  );
}