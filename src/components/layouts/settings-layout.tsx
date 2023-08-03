type SettingsLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  close: () => void;
};

export function SettingsLayout({
  sidebar, children, close
}: SettingsLayoutProps) {
  return (
    <>
    <div>{sidebar}</div>
    <div>
      <div>{children}</div>
    </div>
    <button onClick={close}>
      <img src="#" alt="Close modal" />
    </button>
    </>
  );
}