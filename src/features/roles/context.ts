import { createContext } from 'react';

import type { ActiveRoleContextData } from './types';

export const ActiveRoleContext = createContext<ActiveRoleContextData | null>(null);