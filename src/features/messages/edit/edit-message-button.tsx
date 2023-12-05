import { useMessageAuthorize } from '../hooks';

type EditMessageButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
  id: string | null;
  children: React.ReactNode;
};

export function EditMessageButton({
  set, id, children
}: EditMessageButtonProps) {
  const authorized = useMessageAuthorize();

  if (!authorized) return null;

  return (
    <button onClick={() => {
      set(id === 'editMessage' ? null : 'editMessage');
    }}>
      {children}
    </button>
  );
}