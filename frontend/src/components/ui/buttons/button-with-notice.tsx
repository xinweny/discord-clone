import { useModal } from '@components/hooks';

import { ModalProps } from '@types';

type ButtonWithNoticeProps = {
  action: (() => void) | (() => Promise<void>);
  children: React.ReactNode;
  hasError?: boolean;
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
  hasError = false,
  ...props
}: FullButtonWithNoticeProps<TModalProps>) {
  const [show, toggle, setShow] = useModal();

  const Modal = modal;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await action();
    
    if (!hasError) setShow(true);
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