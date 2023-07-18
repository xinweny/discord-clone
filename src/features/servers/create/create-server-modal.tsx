import { CreateServerForm } from './create-server-form';

type CreateServerModalProps = {
  show: boolean;
};

export function CreateServerModal({
  show
}: CreateServerModalProps) {
  if (!show) return null;

  return (
    <div>
      <h2>Create a server</h2>
      <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
      <CreateServerForm />
    </div>
  );
}