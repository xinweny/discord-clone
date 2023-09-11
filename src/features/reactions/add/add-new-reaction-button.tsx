import { useRef } from 'react';

import { ClickPopup } from '@components/ui/popups';
import { AddReactionForm } from './add-reaction-form';

import { ActiveIdState } from '@hooks';
import { useServerMemberAuthorize } from '@features/members/hooks';

type AddNewReactionButtonProps = {
  hide: () => void;
  activeTabState: ActiveIdState;
};

export function AddNewReactionButton({
  activeTabState,
  hide,
}: AddNewReactionButtonProps) {
  const { set } = activeTabState;

  const addReactionBtnRef = useRef<HTMLButtonElement>(null);

  const authorized = useServerMemberAuthorize();

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
      <img src="#" alt="Add Reaction" />
    </ClickPopup>
  );  
}