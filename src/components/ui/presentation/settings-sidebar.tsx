export type SettingsSidebarProps = {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
};

type SettingsSideBarWrapperProps = {
  children: React.ReactNode;
};

export function SettingsSidebar({
  children,
}: SettingsSideBarWrapperProps) {
  return (
    <div>
      {children}
    </div>
  );
}