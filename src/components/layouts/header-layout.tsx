type HeaderLayoutProps = {
  children: React.ReactNode;
  right?: React.ReactNode;
};

export function HeaderLayout({ children, right }: HeaderLayoutProps) {
  return (
    <>
      <div>{children}</div>
      <div>{right}</div>
    </>
  );
}