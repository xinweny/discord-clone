interface TabGroupProps {
  title?: string;
  children: React.ReactNode;
}

export function TabGroup({
  title, children
}: TabGroupProps) {
  return (
    <div>
      {title && <p><strong>{title.toUpperCase()}</strong></p>}
      <div>
        {children}
      </div>
    </div>
  );
}