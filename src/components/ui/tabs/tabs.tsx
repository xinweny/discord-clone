import { useState } from 'react';

import type { TabData } from '@utils';

import styles from './tabs.module.scss';

type TabsProps = {
  tabs: TabData[];
  init?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function Tabs({
  tabs,
  init = 0,
  ...props
}: TabsProps) {
  const [activeId, setActiveId] = useState<string>(tabs[init].id);

  const Component = tabs.find(tab => tab.id === activeId)?.component;

  return (
    <div {...props}>
      <nav>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.button} ${activeId === tab.id ? styles.active : ''}`}
            onClick={() => { setActiveId(tab.id); }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {Component && <Component />}
    </div>
  );
}