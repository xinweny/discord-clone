import {
  ModalButtonProps,
  ModalButton,
} from '@components/ui/buttons';

import { LeaveServerModal } from './leave-server-modal';

type LeaveServerButtonProps = {
  children?: React.ReactNode;
} & ModalButtonProps;

export function LeaveServerButton({
  btnRef,
  hidden,
  children,
}: LeaveServerButtonProps) {
  return (
    <ModalButton
      btnRef={btnRef}
      hidden={hidden}
      modal={LeaveServerModal}
    >
      {children}
    </ModalButton>
  );
}