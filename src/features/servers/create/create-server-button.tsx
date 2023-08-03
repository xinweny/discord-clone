import { useModal } from '@hooks';

import { CreateServerModal } from './create-server-modal';

export function CreateServerButton() {
  const [show, toggle] = useModal();

  return (
    <div>
      <button onClick={toggle}>
        <img src="#" alt="Add a Server" />
      </button>
      <CreateServerModal isOpen={show} onClose={toggle} />
    </div>
  );
}