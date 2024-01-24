import { useState, useEffect } from 'react';

import { useModal } from '@components/hooks';

import { ModalProps } from '@types';

type ButtonWithNoticeProps = {
  action: (() => void) | (() => Promise<void>);
  children: React.ReactNode;
  error?: any;
} & React.HTMLAttributes<HTMLButtonElement>;

type FullButtonWithNoticeProps<TModalProps> = {
  modalProps?: TModalProps;
  modal: React.FC<ModalProps>;
} & ButtonWithNoticeProps;

export function ButtonWithNotice<TModalProps>({
  action,
  children,
  modal,
  modalProps,
  error,
  ...props
}: FullButtonWithNoticeProps<TModalProps>) {
  const [hasError, setHasError] = useState<boolean>(!error);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  const [show, toggle] = useModal();

  const Modal = modal;

  const handleClick = async () => {
    await action();

    if (!hasError) toggle();
  };

  return (
    <>
      <button
        {...props}
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
      <Modal isOpen={show && !hasError} onClose={toggle} {...modalProps} />
    </>
  )
}