type SubmitButtonProps = {
  className?: string;
  isDirty: boolean;
  isValid: boolean;
  children: React.ReactNode;
};

export function SubmitButton({
  className,
  isDirty,
  isValid,
  children,
}: SubmitButtonProps) {
  return (
    <button
      className={className}
      type="submit"
      disabled={!isDirty || !isValid}
    >{children}</button>
  );
}