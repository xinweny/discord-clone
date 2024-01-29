import { createContext, useContext } from 'react';

import type { ActiveRoleContextData } from './types';

export const ActiveRoleContext = createContext<ActiveRoleContextData | null>(null);

export const useActiveRoleContext = () => useContext(ActiveRoleContext);