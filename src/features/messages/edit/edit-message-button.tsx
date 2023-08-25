type EditMessageButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
};

export function EditMessageButton({
  set
}: EditMessageButtonProps) {
  return (
    <button onClick={() => { set('editMessage'); }}>
      <img src="#" alt="Edit Message" />
    </button>
  );
}