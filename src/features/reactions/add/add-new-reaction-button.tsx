import { useRef } from 'react';

import { Popout } from '@components/ui/popups';
import { AddReactionForm } from './add-reaction-form';

import type { ActiveIdState } from '@hooks';
import type { PositionData } from '@components/hooks';

type AddNewReactionButtonProps = {
  hide: () => void;
  activeTabState: ActiveIdState;
  authorized: boolean;
  children: React.ReactNode;
  position: PositionData
};

export function AddNewReactionButton({
  activeTabState,
  hide,
  authorized,
  children,
  position,
}: AddNewReactionButtonProps) {
  const { set } = activeTabState;

  const addReactionBtnRef = useRef<HTMLButtonElement>(null);

  if (!authorized) return null;

  return (
    <Popout
      renderPopup={() => (
        <AddReactionForm btnRef={addReactionBtnRef} />
      )}
      onOpen={() => { set('addReaction'); }}
      onClose={() => {
        set(null);
        hide();
      }}
      btnRef={addReactionBtnRef}
      position={position}
    >
      {children}
    </Popout>
  );  
}