import _ from 'lodash';
import { useState } from 'react';

import styles from './tabs.module.scss';


type TabsProps = {
  tabs: {
    [key: string]: React.ReactNode;
  };
  init?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function Tabs({
  tabs,
  init = 0,
  ...props
}: TabsProps) {
  const t = _.map(tabs, (node, label) => ({
    label,
    component: node,
  }));

  const [activeId, setActiveId] = useState<string>(t[init].label);

  const component = t.find(tab => tab.label === activeId)?.component;

  return (
    <div {...props}>
      <nav>
        {t.map(tab => (
          <button
            key={tab.label}
            className={`${styles.button} ${activeId === tab.label ? styles.active : ''}`}
            onClick={() => { setActiveId(tab.label); }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {component}
    </div>
  );
}