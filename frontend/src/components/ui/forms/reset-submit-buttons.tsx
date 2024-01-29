import { useFormContext } from 'react-hook-form';

import { SubmitButton } from '.';

type ResetSubmitButtonsProps = {
  submitLabel?: string;
  closeBtnRef?: React.RefObject<HTMLButtonElement>;
  resetLabel?: string;
  className?: string;
};

export function ResetSubmitButtons({
  submitLabel = 'Submit',
  closeBtnRef,
  resetLabel = 'Cancel',
  className,
}: ResetSubmitButtonsProps) {
  const { reset } = useFormContext();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          reset();
          if (closeBtnRef) closeBtnRef.current?.click();
        }}
      >{resetLabel}</button>
      <SubmitButton>{submitLabel}</SubmitButton>
    </div>
  );
}