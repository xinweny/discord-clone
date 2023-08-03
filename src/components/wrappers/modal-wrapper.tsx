type ModalWrapperProps = {
  className?: string;
  closeModal: () => void;
  children: React.ReactNode;
};

export function ModalWrapper({
  className,
  closeModal,
  children
}: ModalWrapperProps) {
  return (
    <div onClick={closeModal}>
      <div
        className={className}
        onClick={e => { e.stopPropagation(); }}>
        {children}
      </div>
    </div>
  );
}