import { useRef } from 'react';

import type { PositionData } from '@components/hooks';

import { ClickPopup } from '@components/ui/popups';
import { CreateDmForm } from './create-dm-form';


type CreateDmButtonProps = {
  children: React.ReactNode;
  position: PositionData;
}

export function CreateDmButton({ children, position }: CreateDmButtonProps) {
  const createDmBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ClickPopup
      renderPopup={() => <CreateDmForm btnRef={createDmBtnRef} />}
      btnRef={createDmBtnRef}
      position={position}
    >
      {children}
    </ClickPopup>
  );
}