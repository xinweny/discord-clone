import { createPortal } from 'react-dom';

type ModalWrapperProps = {
  className?: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export function ModalWrapper({
  className,
  isOpen,
  closeModal,
  children
}: ModalWrapperProps) {
  const modalRootNode = document.getElementById('modal-root');
  
  if (!isOpen || !modalRootNode) return null;

  return createPortal((
    <div onClick={closeModal}>
      <div
        className={className}
        onClick={e => { e.stopPropagation(); }}
      >
        {children}
      </div>
    </div>
  ), modalRootNode);
}