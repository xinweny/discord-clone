import { ClickPopup } from '@components/ui/popups';
import { AddReactionForm } from './add-reaction-form';

type AddNewReactionButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
};

export function AddNewReactionButton({
  set
}: AddNewReactionButtonProps) {
  const closeForm = () => { set(null); };

  return (
    <ClickPopup
      renderPopup={() => <AddReactionForm closeForm={closeForm} />}
      onOpen={() => { set('addReaction'); }}
      onClose={closeForm}
    >
      <img src="#" alt="Add Reaction" />
    </ClickPopup>
  );  
}