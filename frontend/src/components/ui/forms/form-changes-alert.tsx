import { useFormContext } from 'react-hook-form';

import styles from './form-changes-alert.module.scss';

type FormChangesAlertProps = {
  defaultValues?: { [key: string]: any };
  className?: string;
};

export function FormChangesAlert({ defaultValues, className }: FormChangesAlertProps) {
  const {
    reset,
    formState: { isDirty, isValid },
  } = useFormContext();

  return (isDirty && (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${className || ''}`}>
        <span>Careful - you have unsaved changes!</span>
        <button
          type="reset"
          onClick={() => {
          reset(defaultValues, {
            keepDefaultValues: !!defaultValues,
          });
          }}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={!isValid}
        >
          Save Changes
        </button>
      </div>
    </div>
  ));
}