import { useMessageAuthorize } from '../hooks';

type EditMessageButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
};

export function EditMessageButton({
  set
}: EditMessageButtonProps) {
  const authorized = useMessageAuthorize();

  if (!authorized) return null;

  return (
    <button onClick={() => { set('editMessage'); }}>
      <img src="#" alt="Edit Message" />
    </button>
  );
}