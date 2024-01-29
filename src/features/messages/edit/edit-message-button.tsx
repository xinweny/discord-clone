type EditMessageButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
  id: string | null;
  children: React.ReactNode;
};

export function EditMessageButton({
  set, id, children
}: EditMessageButtonProps) {
  return (
    <button onClick={() => {
      set(id === 'editMessage' ? null : 'editMessage');
    }}>
      {children}
    </button>
  );
}