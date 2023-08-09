type FieldSetGroupProps = {
  legend: string;
  children: React.ReactNode;
};

export function Fieldset({ legend, children }: FieldSetGroupProps) {
  return (
    <fieldset>
      <legend>{legend.toUpperCase()}</legend>
      <div>
        {children}
      </div>
    </fieldset>
  );
}