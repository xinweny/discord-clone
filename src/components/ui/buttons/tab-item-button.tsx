import styles from './tab-item-button.module.scss';

type TabItemButtonProps = {
  tabId: string;
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode | string;
};

export function TabItemButton({
  tabId, activeTabId, setActiveTabId, children
}: TabItemButtonProps) {
  const className = `${styles.button} ${activeTabId === tabId ? styles.active : ''}`;

  return (
    <button
      className={className}
      onClick={() => { setActiveTabId(tabId); }}
    >
      {children}
    </button>
  );
}