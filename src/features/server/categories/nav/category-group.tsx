type CategoryGroupProps = {
  name: string;
  children: React.ReactNode;
};

export function CategoryGroup({
  name, children,
}: CategoryGroupProps) {
  return (
    <div>
      <p>{name.toUpperCase()}</p>
      <div>
        {children}
      </div>
    </div>
  );
}