import { useEffect } from 'react';
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
  onOpen?: () => void;
} & ModalButtonProps;

export function ModalButton<TModalProps>({
  children,
  btnRef,
  modal,
  modalProps,
  onOpen,
  ...props
}: FullModalButtonProps<TModalProps>) {
  const [show, toggle] = useModal();

  const Modal = modal;

  useEffect(() => {
    if (show && onOpen) onOpen();
  }, [show]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        {...props}
        className={`${styles.modalButton} ${props.className || ''}`}
      >
        {children}
      </button>
      <Modal isOpen={show} onClose={toggle} {...modalProps} />
    </>
  );
}