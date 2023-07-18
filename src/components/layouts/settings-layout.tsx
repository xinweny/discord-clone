type SettingsLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  toggle: React.ReactEventHandler;
};

export function SettingsLayout({
  sidebar, children, toggle
}: SettingsLayoutProps) {
  return (
    <>
    <div>{sidebar}</div>
    <div>
      <div>{children}</div>
    </div>
    <button onClick={toggle}>
      <img src="#" alt="x" />
    </button>
    </>
  );
}