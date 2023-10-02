import { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import type { ActiveRoleContextData, RoleData } from './types';

import { ServerContext } from '@features/servers/context';
import { ActiveRoleContext } from './context';

import { useGetRolesQuery } from './api';

export type TabData = {
  label: string;
  id: string;
};

export type RoleTabsHookData = {
  activeTab: TabData;
  tabs: TabData[];
  changeTab: (id: string) => void;
  checkPermissions: (disallowedLabels: string[], label: string) => boolean;
  activeRole: ActiveRoleContextData;
  roles: RoleData[];
};

export const useRoleTabs = (labels: string[]): RoleTabsHookData => {
  const tabs = labels.map(label => ({ label, id: uuid() }));

  const { _id: serverId } = useContext(ServerContext)!;
  const activeRole = useContext(ActiveRoleContext)!;

  const [activeTab, setActiveTab] = useState<TabData>(tabs[0]);

  const roles = useGetRolesQuery({ serverId });

  const checkPermissions = (disallowedLabels: string[], label: string) => {
    return !(
      roles.data &&
      activeRole.data?._id === roles.data[0]._id &&
      disallowedLabels.includes(label)
    ) as boolean;
  };

  const changeTab = (label: string) => {
    const tab = tabs.find(tab => tab.label === label);

    if (tab) setActiveTab(tab);
  };

  return {
    activeTab,
    tabs,
    changeTab,
    checkPermissions,
    activeRole,
    roles: roles.data || [],
  };
};