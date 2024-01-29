import { createContext, useContext } from 'react';

import type { CategoryData } from './types';

export const CategoryContext = createContext<CategoryData | null>(null);

export const useCategoryContext = () => useContext(CategoryContext);