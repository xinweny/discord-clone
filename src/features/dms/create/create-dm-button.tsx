import { useRef } from 'react';

import { ClickPopup } from '@components/ui/popups';
import { CreateDmForm } from './create-dm-form';

type CreateDmButtonProps = {
  children: React.ReactNode;
}

export function CreateDmButton({ children }: CreateDmButtonProps) {
  const createDmBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ClickPopup
      renderPopup={() => <CreateDmForm btnRef={createDmBtnRef} />}
      btnRef={createDmBtnRef}
      position={{
        direction: 'left',
        align: 'center',
        gap: -24,
      }}
    >
      {children}
    </ClickPopup>
  );
}