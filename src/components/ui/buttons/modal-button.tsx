import { useModal } from '@hooks';

import type { ModalProps } from '@types';

type ModalButtonProps<TModalProps> = {
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
  modalProps?: TModalProps;
  modal: React.FC<ModalProps>;
} & React.HTMLAttributes<HTMLButtonElement>;

export function ModalButton<TModalProps>({
  children,
  btnRef,
  modal,
  modalProps,
  ...props
}: ModalButtonProps<TModalProps>) {
  const [show, toggle] = useModal();

  const Modal = modal;

  return (
    <div>
      <button ref={btnRef} onClick={toggle} {...props}>
        {children}
      </button>
      <Modal isOpen={show} onClose={toggle} {...modalProps} />
    </div>
  );
}