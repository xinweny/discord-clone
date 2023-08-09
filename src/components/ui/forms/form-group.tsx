type FormGroupProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
};

export function FormGroup({
  label,
  htmlFor,
  children,
}: FormGroupProps) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label.toUpperCase()}</label>
      {children}
    </div>
  );
}