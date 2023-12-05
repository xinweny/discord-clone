import { useRef } from 'react';

import { ClickPopup } from '@components/ui/popups';
import { AddReactionForm } from './add-reaction-form';

import { ActiveIdState } from '@hooks';

type AddNewReactionButtonProps = {
  hide: () => void;
  activeTabState: ActiveIdState;
  authorized: boolean;
  children: React.ReactNode;
};

export function AddNewReactionButton({
  activeTabState,
  hide,
  authorized,
  children,
}: AddNewReactionButtonProps) {
  const { set } = activeTabState;

  const addReactionBtnRef = useRef<HTMLButtonElement>(null);

  if (!authorized) return null;

  return (
    <ClickPopup
      renderPopup={() => (
        <AddReactionForm btnRef={addReactionBtnRef} />
      )}
      onOpen={() => { set('addReaction'); }}
      onClose={() => {
        set(null);
        hide();
      }}
      btnRef={addReactionBtnRef}
    >
      {children}
    </ClickPopup>
  );  
}