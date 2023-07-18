interface TabItemProps {
  tabId: string;
  activeTabId: string;
  setActiveTabId: React.ReactEventHandler;
  children: React.ReactNode | string;
}

export function TabItem({
  tabId, activeTabId, setActiveTabId, children
}: TabItemProps) {
  const className = `tab-item ${activeTabId === tabId ? 'active' : ''}`;

  return (
    <button className={className} onClick={setActiveTabId}>
      {children}
    </button>
  );
}