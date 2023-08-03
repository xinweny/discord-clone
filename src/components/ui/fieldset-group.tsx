type FieldSetGroupProps = {
  name: string;
  children: React.ReactNode;
};

export function FieldsetGroup({ name, children }: FieldSetGroupProps) {
  return (
    <fieldset>
      <legend>{name}</legend>
      <div>
        {children}
      </div>
    </fieldset>
  );
}