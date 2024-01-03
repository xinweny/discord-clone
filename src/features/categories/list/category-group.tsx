import { useState } from 'react';

import type { CategoryData } from '../types';

import { CategoryHeader } from './category-header';

type CategoryGroupProps = {
  category: CategoryData;
  children: React.ReactNode;
};

export function CategoryGroup({
  category, children,
}: CategoryGroupProps) {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div>
      <CategoryHeader
        category={category}
        show={show}
        toggleShow={() => { setShow(prev => !prev); }}
      />
      <div hidden={!show}>
        {children}
      </div>
    </div>
  );
}