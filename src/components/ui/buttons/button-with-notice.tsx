import { useModal } from '@components/hooks';

import { ModalProps } from '@types';

type ButtonWithNoticeProps = {
  action: (() => void) | (() => Promise<void>);
  children: React.ReactNode;
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
  ...props
}: FullButtonWithNoticeProps<TModalProps>) {
  const [show, toggle] = useModal();

  const Modal = modal;

  const handleClick = async () => {
    try {
      await action();

      toggle();
    } catch {
      return;
    }
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
      <Modal isOpen={show} onClose={toggle} {...modalProps} />
    </>
  )
}