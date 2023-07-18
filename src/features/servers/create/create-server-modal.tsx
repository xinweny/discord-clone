import { CreateServerForm } from './create-server-form';

import type { ModalProps } from '@types';

export function CreateServerModal({
  show, onClose
}: ModalProps) {
  if (!show) return null;

  return (
    <div>
      <h2>Create a server</h2>
      <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
      <CreateServerForm />
      <button type="button" onClick={onClose}>x</button>
    </div>
  );
}