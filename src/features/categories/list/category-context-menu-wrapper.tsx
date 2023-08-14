import { useRef } from 'react';

import type { CategoryData } from '../types';

import { ContextMenuWrapper } from '@components/wrappers';

import { EditCategoryButton } from '../edit';
import { DeleteCategoryButton } from '../delete';

type CategoryContextMenuWrapperProps = {
  category: CategoryData;
  children: React.ReactNode;
};

export function CategoryContextMenuWrapper({
  category,
  children,
}: CategoryContextMenuWrapperProps) {
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const options = [
    {
      label: 'Edit Category',
      action: () => {
        if (editBtnRef) editBtnRef.current?.click();
      },
    },
    {
      label: 'Delete Category',
      action: () => {
        if (deleteBtnRef) deleteBtnRef.current?.click();
      },
    },
  ];

  return (
    <>
      <ContextMenuWrapper options={options}>
        {children}
      </ContextMenuWrapper>
      <div>
        <EditCategoryButton
          btnRef={editBtnRef}
          category={category}
          hidden
        />
        <DeleteCategoryButton
          btnRef={deleteBtnRef}
          category={category}
          hidden
        />
      </div>
    </>
  )
}