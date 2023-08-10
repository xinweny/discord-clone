import { useFormContext } from 'react-hook-form';

type SubmitButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function SubmitButton({
  className,
  children,
}: SubmitButtonProps) {
  const { formState: { isDirty, isValid } } = useFormContext();
  
  return (
    <button
      className={className}
      type="submit"
      disabled={!isDirty && !isValid}
    >{children}</button>
  );
}