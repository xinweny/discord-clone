import { ClickPopup } from '@components/ui/popups';
import { AddReactionForm } from './add-reaction-form';

type AddNewReactionButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
};

export function AddNewReactionButton({
  set
}: AddNewReactionButtonProps) {
  return (
    <ClickPopup
      renderPopup={() => <AddReactionForm />}
      onOpen={() => { set('addReaction'); }}
      onClose={() => { set(null); }}
    >
      <img src="#" alt="Add Reaction" />
    </ClickPopup>
  );  
}