import { useFormContext } from 'react-hook-form';

type FormChangesAlertProps = {
  defaultValues?: { [key: string]: any };
};

export function FormChangesAlert({ defaultValues }: FormChangesAlertProps) {
  const {
    reset,
    formState: { isDirty, isValid },
  } = useFormContext();

  return (isDirty && (
    <div>
      <p>Careful - you have unsaved changes!</p>
      <button type="reset" onClick={() => {
        reset(defaultValues, {
          keepDefaultValues: !!defaultValues,
        });
        }}>Reset</button>
      <button
        type="submit"
        disabled={!isValid}
      >Save Changes</button>
    </div>
  ));
}