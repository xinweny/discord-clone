import type { CategoryData } from '../types';

import { CategoryHeader } from './category-header';

type CategoryGroupProps = {
  category: CategoryData;
  children: React.ReactNode;
};

export function CategoryGroup({
  category, children,
}: CategoryGroupProps) {
  return (
    <div>
      <CategoryHeader category={category} />
      <div>
        {children}
      </div>
    </div>
  );
}