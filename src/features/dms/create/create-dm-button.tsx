import { useRef } from 'react';

import { ClickPopup } from '@components/ui/popups';
import { CreateDmForm } from './create-dm-form';

export function CreateDmButton() {
  const createDmBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ClickPopup
      renderPopup={() => <CreateDmForm btnRef={createDmBtnRef} />}
      btnRef={createDmBtnRef}
    >
      <img src="#" alt="Create DM" />
    </ClickPopup>
  );
}