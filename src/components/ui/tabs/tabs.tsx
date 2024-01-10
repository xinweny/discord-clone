import _ from 'lodash';
import { useState } from 'react';

import styles from './tabs.module.scss';

type TabsProps = {
  tabs: {
    [key: string]: React.ReactNode;
  };
  init?: number;
  activeStyles?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Tabs({
  tabs,
  init = 0,
  activeStyles,
  ...props
}: TabsProps) {
  const t = _.map(tabs, (node, label) => ({
    label,
    component: node,
  }));

  const [activeId, setActiveId] = useState<string>(t[init].label);

  const component = t.find(tab => tab.label === activeId)?.component;

  return (
    <>
      <nav className={`${styles.tabs} ${props.className || ''}`}>
        {t.map(tab => (
          <button
            key={tab.label}
            className={`${styles.button} ${activeId === tab.label ? styles.active : ''} ${activeStyles || ''}`}
            onClick={() => { setActiveId(tab.label); }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      {component}
    </>
  );
}