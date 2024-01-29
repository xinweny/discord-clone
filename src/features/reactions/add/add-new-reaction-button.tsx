import { useRef } from 'react';

import { Popout } from '@components/ui/popups';
import { AddReactionForm } from './add-reaction-form';

import type { ActiveIdState } from '@hooks';
import type { PositionData } from '@components/hooks';

type AddNewReactionButtonProps = {
  hide?: () => void;
  activeTabState: ActiveIdState;
  authorized: boolean;
  children: React.ReactNode;
  position: PositionData;
  className?: string;
};

export function AddNewReactionButton({
  activeTabState,
  hide,
  authorized,
  children,
  position,
  className,
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
        if (hide) hide();
      }}
      btnRef={addReactionBtnRef}
      position={position}
      className={className}
    >
      {children}
    </Popout>
  );  
}