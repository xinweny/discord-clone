import { UserShortcutsBar } from '@features/user/profile';

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