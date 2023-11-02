import { useModal } from '@components/hooks';

import type { ModalProps } from '@types';

import styles from './modal-button.module.scss';

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
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        {...props}
        className={`${styles.modalButton} ${props.className || ''}`}
      >
        {children}
      </button>
      <Modal isOpen={show} onClose={toggle} {...modalProps} />
    </>
  );
}