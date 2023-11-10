import { useContext } from 'react';

import { DmHeaderContext, DmPanelContext } from './context';

export const useDmHeaderContext = () => useContext(DmHeaderContext);

export const useDmPanelContext = () => useContext(DmPanelContext);