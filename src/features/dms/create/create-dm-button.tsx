import { ClickPopup } from '@components/ui/popups';
import { CreateDmForm } from './create-dm-form';

export function CreateDmButton() {
  return (
    <ClickPopup
      renderPopup={() => <CreateDmForm />}
    >
      <img src="#" alt="Create DM" />
    </ClickPopup>
  );
}