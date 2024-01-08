import { useRef } from 'react';

import type { CategoryData } from '../types';

import { ContextMenuWrapper } from '@components/ui/context-menu';

import { EditCategoryButton } from '../edit';
import { DeleteCategoryButton } from '../delete';

import styles from './category-context-menu-wrapper.module.scss';

type CategoryContextMenuWrapperProps = {
  category: CategoryData;
  children: React.ReactNode;
  className?: string;
};

export function CategoryContextMenuWrapper({
  category,
  children,
  className,
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
      className: styles.danger,
    },
  ];

  return (
    <>
      <ContextMenuWrapper options={options} className={className}>
        {children}
      </ContextMenuWrapper>
      <div hidden>
        <EditCategoryButton
          btnRef={editBtnRef}
          category={category}
        />
        <DeleteCategoryButton
          btnRef={deleteBtnRef}
          category={category}
        />
      </div>
    </>
  );
}