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
  if (!isOpen) return null;

  return (
    <div onClick={closeModal}>
      <div
        className={className}
        onClick={e => { e.stopPropagation(); }}
      >
        {children}
      </div>
    </div>
  );
}