import { UserShortcutsBar } from '@features/users/profile';

type SidebarLayoutProps = {
  top: React.ReactNode;
  children: React.ReactNode;
};

export function SidebarLayout({
  top, children,
}: SidebarLayoutProps) {
  return (
    <>
      <div>
        {top}
      </div>
      <div>
        {children}
      </div>
      <div>
        <UserShortcutsBar />
      </div>
    </>
  );
}