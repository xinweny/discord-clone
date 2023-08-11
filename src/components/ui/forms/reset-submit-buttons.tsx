import { useFormContext } from 'react-hook-form';

import { SubmitButton } from '.';

type ResetSubmitButtonsProps = {
  submitLabel: string;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}

export function ResetSubmitButtons({ submitLabel, closeBtnRef }: ResetSubmitButtonsProps) {
  const { reset } = useFormContext();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          reset();
          closeBtnRef.current?.click();
        }}
      >Cancel</button>
      <SubmitButton>{submitLabel}</SubmitButton>
    </div>
  );
}