import { useFormContext } from 'react-hook-form';

type SubmitButtonProps = {
  className?: string;
  children: React.ReactNode;
  withoutDisable?: boolean;
};

export function SubmitButton({
  className,
  children,
  withoutDisable = false,
}: SubmitButtonProps) {
  const { formState: { isDirty, isValid } } = useFormContext();
  
  return (
    <button
      className={className}
      type="submit"
      disabled={!withoutDisable && (!isDirty && !isValid)}
    >
      {children}
    </button>
  );
}