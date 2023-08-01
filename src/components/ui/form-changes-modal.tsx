import { UseFormReset } from 'react-hook-form';

type FormChangesModalProps ={
  isDirty: boolean;
  reset: UseFormReset<any>;
};

export function FormChangesModal({
  isDirty,
  reset,
}: FormChangesModalProps) {
  return (isDirty && <div>
    <p>Careful - you have unsaved changes!</p>
    <button type="reset" onClick={() => { reset(); }}>Reset</button>
    <button type="submit">Save Changes</button>
  </div>);
}