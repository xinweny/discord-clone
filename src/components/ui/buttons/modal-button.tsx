import { useModal } from '@hooks';

import type { ModalProps } from '@types';

export type ModalButtonProps = {
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

type FullModalButtonProps<TModalProps> = {
  modalProps?: TModalProps;
  modal: React.FC<ModalProps>;
} & ModalButtonProps;

export function ModalButton<TModalProps>({
  children,
  btnRef,
  modal,
  modalProps,
  ...props
}: FullModalButtonProps<TModalProps>) {
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