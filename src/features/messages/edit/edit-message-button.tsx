import { useMessageAuthorize } from '../hooks';

type EditMessageButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactNode;
};

export function EditMessageButton({
  set, children
}: EditMessageButtonProps) {
  const authorized = useMessageAuthorize();

  if (!authorized) return null;

  return (
    <button onClick={() => { set('editMessage'); }}>
      {children}
    </button>
  );
}