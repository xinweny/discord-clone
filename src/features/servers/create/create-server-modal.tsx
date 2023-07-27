import { useRef } from 'react';

import { CreateServerForm } from './create-server-form';

import type { ModalProps } from '@types';

export function CreateServerModal({
  show, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  if (!show) return null;

  return (
    <div>
      <h2>Create a server</h2>
      <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
      <CreateServerForm closeBtn={closeBtnRef.current} />
      <button ref={closeBtnRef} type="button" onClick={onClose}>x</button>
    </div>
  );
}