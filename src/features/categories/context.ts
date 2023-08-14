import { createContext } from 'react';

import type { CategoryData } from './types';

export const CategoryContext = createContext<CategoryData | null>(null);