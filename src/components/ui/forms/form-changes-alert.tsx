import { useFormContext } from 'react-hook-form';

export function FormChangesAlert() {
  const { reset, formState: isDirty } = useFormContext();

  return (isDirty && (
    <div>
      <p>Careful - you have unsaved changes!</p>
      <button type="reset" onClick={() => { reset(); }}>Reset</button>
      <button type="submit">Save Changes</button>
    </div>
  ));
}